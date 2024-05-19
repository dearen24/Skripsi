"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FormSelect } from "react-bootstrap";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { getSemester } from "@/app/actions/semester";
import { addKonsumsiNonPengawas } from "@/app/actions/konsumsi";
import ToastErrorInput from "../toast/ErrorInput";
import { KonsumsiNonPengawasSchema } from "@/modules/schema";

export default function AddKonsumsiNonPengawas(){
    const [isLoading,setLoading] = useState(true);
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const [semester, setSemester] = useState(new Object);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const semester = await getSemester();
                
                setLoading(false);
                setSemester(semester);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const add = async (formData:FormData) => {
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
            const response = await addKonsumsiNonPengawas(formData);
            if(response){
                ref.current?.reset();
                openModal();
                openToast();
            }
            else{
                alert("Gagal menambahkan konsumsi non pengawas");
            }
        }
        else{
            setError(validation.error.issues);
            openToastError();
        }
        
    }

    const backToHomepage = async () => {
        router.push("/admin/konsumsi");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Konsumsi Non-Pengawas</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Semester</label>
                                    <FormSelect name="semester" style={{border:"2px solid black"}}>
                                        {semester.map((sem)=>(
                                            <option value={sem.id}>{sem.semester}</option>
                                        ))}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Tanggal</label>
                                    <input type="date" name="tanggal" className="form-control" placeholder="Masukan Kuota Mengawas" style={{border:"2px solid black"}}/>
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
                                    <input type="number" name="snack" className="form-control" placeholder="Masukan Kuota Mengawas" style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Jumlah Makan Siang</label>
                                    <input type="number" name="lunch" className="form-control" placeholder="Masukan Kuota Mengawas" style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Catatan</label>
                                    <textarea name="catatan" className="form-control" placeholder="Masukan Kuota Mengawas" rows={3} style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Konsumsi Non-Pengawas"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Konsumsi Non-Pengawas"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Konsumsi Non-Pengawas"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}