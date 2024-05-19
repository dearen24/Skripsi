"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormSelect, Modal, Toast, ToastContainer } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import { addKonsumsiNonPengawas, editKonsumsiNonPengawas, getKonsumsiNonPengawasById } from "@/app/actions/konsumsi";
import ToastSuccessEdit from "../toast/SuccessEdit";
import Image from "next/image";
import LoadingPage from "../LoadingPage";
import { KonsumsiNonPengawasSchema } from "@/modules/schema";

export default function EditKonsumsiNonPengawas({params}){
    const [isLoading,setLoading] = useState(true);
    const [modal,setModal] = useState(false);
    const [konsumsi,setKonsumsi] = useState(new Object);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [semester, setSemester] = useState(new Object);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const semester = await getSemester();
                const konsumsi = await getKonsumsiNonPengawasById(params);
                console.log(params);
                setKonsumsi(konsumsi);
                setSemester(semester);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const data = {
            tanggal: formData.get("tanggal"),
            semester: formData.get("semester"),
            masaujian: formData.get("masaujian"),
            snack: Number(formData.get("snack")),
            lunch: Number(formData.get("lunch")),
            catatan: formData.get("catatan"),
        }

        const validation = KonsumsiNonPengawasSchema.safeParse(data);

        if(validation.success){
            const response = await editKonsumsiNonPengawas(formData,params);
            if(response){
                openToast();
            }
            else{
                alert("Gagal menambahkan jabatan");
            }
        }
        else{
            setError(validation.error.issues);
            openToastError();
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Edit Konsumsi Non-Pengawas</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Semester</label>
                                    <FormSelect name="semester" style={{border:"2px solid black"}}>
                                        {semester.map((sem)=>(
                                            sem.id==konsumsi.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Tanggal</label>
                                    <input type="date" name="tanggal" className="form-control" defaultValue={konsumsi.date.toISOString().substring(0,10)} style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Masa Ujian</label>
                                    <FormSelect name="masaujian" style={{border:"2px solid black"}}>
                                        <option value="UTS">UTS</option>
                                        <option value="UAS">UAS</option>
                                    </FormSelect>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Jumlah Snack</label>
                                    <input type="number" name="snack" className="form-control" defaultValue={konsumsi.snack} style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Jumlah Makan Siang</label>
                                    <input type="number" name="lunch" className="form-control" defaultValue={konsumsi.lunch} style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Catatan</label>
                                    <textarea name="catatan" className="form-control" defaultValue={konsumsi.description} rows={3} style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-warning w-100 my-2" style={{border:"2px solid black"}}>
                            <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                            Simpan Perubahan
                        </button>
                    </form>
                </div>
            </div>
            
            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
        </>
    )
}