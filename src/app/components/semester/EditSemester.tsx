"use client"
import { useEffect, useState } from "react";
import { editSemester, getActiveSemester, getSemesterById } from "../../actions/semester";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import LoadingPage from "../LoadingPage";
import ModalMultipleActiveSemesterAlert from "../modal/MultipleActiveSemester";
import { SemesterSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function EditSemester({params}){
    const [isLoading,setLoading] = useState(true);
    const [semester,setSemester] = useState();
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const [modalSemester,setModalSemester] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    const closeModalSemester = () => setModalSemester(false);
    const openModalSemester = () => setModalSemester(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getSemesterById(params);
                setSemester(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const activeSemester = await getActiveSemester();
        if(activeSemester!=null&&formData.get("status")?.toString()=="Aktif"){
            openModalSemester();
        }
        else{
            let status = false;
            if(formData.get("status")?.toString()=="Aktif"){
                status = true;
            }

            const data = {
                semester: formData.get("semester"),
                status: status,
            }
    
            const validation = SemesterSchema.safeParse(data);
    
            if(validation.success){
                const response = await editSemester(formData,params);
                if(response==true){
                    openToast();
                }
                else{
                    alert("Gagal Mengubah Jabatan");
                }
            }
            else{
                setError(validation.error.issues);
                openToastError();
            }
            
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Semester</strong></h3>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Semester</label>
                                    <input type="text" name="semester" className="form-control" defaultValue={semester?.semester} placeholder="Masukan nama semester" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Semester</label>
                                    <select className="form-control" name="status" style={{border:"2px solid black"}}>
                                        {semester?.status==false ? <><option value="Tidak Aktif">Tidak Aktif</option> <option value="Aktif">Aktif</option></> : 
                                        <><option value="Aktif">Aktif</option><option value="Tidak Aktif">Tidak Aktif</option></>}
                                    </select>
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
            <ModalMultipleActiveSemesterAlert modal={modalSemester} closeModal={closeModalSemester} action={"Mengubah"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}