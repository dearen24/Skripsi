"use client"
import { useEffect, useState } from "react";
import { editJabatan, getJabatanById } from "../../actions/jabatan";
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import LoadingPage from "../LoadingPage";
import { JabatanSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function EditRole({params}){
    const [isLoadingJabatan,setLoadingJabatan] = useState(true);
    const [role,setRole] = useState();
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getJabatanById(params);
                setRole(data);
                setLoadingJabatan(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const data = {
            nama: formData.get("nama"),
            kuotaMengawas: Number(formData.get("kuotaMengawas")),
        }

        const validation = JabatanSchema.safeParse(data);

        if(validation.success){
            const response = await editJabatan(formData,params);
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

    if(isLoadingJabatan){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Jabatan</strong></h3>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Jabatan</label>
                                    <input type="text" name="nama" className="form-control" defaultValue={role?.nama} style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kuota Mengawas</label>
                                    <input type="number" name="kuotaMengawas" className="form-control" defaultValue={role?.kuotaMengawas} style={{border:"2px solid black"}}/>
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
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error}/>
        </>
    )
}