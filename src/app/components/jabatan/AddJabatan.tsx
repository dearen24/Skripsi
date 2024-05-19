"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addJabatan } from "@/app/actions/jabatan";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { JabatanSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function AddRole(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    const backToHomepage = () => router.push("/admin/jabatan");

    const add = async (formData:FormData) => {
        const data = {
            nama: formData.get("nama"),
            kuotaMengawas: Number(formData.get("kuotaMengawas")),
        }

        const validation = JabatanSchema.safeParse(data);

        if(validation.success){
            const response = await addJabatan(formData);
            if(response){
                ref.current?.reset();
                openModal();
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

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Jabatan</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Jabatan</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Jabatan" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kuota Mengawas</label>
                                    <input type="number" name="kuotaMengawas" className="form-control" placeholder="Masukan Kuota Mengawas" formNoValidate={true} style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Jabatan"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Jabatan"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Jabatan"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error}/>
        </>
    )
}