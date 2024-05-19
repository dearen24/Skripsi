"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { addRuangan } from "@/app/actions/ruangan";
import { RuanganSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function AddClass(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    const backToHomepage = () => router.push("/admin/ruangan");

    const add = async (formData:FormData) => {
        const data = {
            nama: formData.get("nama"),
            kapasitas: Number(formData.get("kapasitas"))
        }

        const validation = RuanganSchema.safeParse(data);

        if(validation.success){
            const response = await addRuangan(formData);
            if(response==true){
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
                    <h3><strong>Tambah Ruangan</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Ruangan</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Ruangan" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kapasitas</label>
                                    <input type="number" name="kapasitas" className="form-control" placeholder="Masukan Kapasitas Ruangan" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Ruangan"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Ruangan"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Ruangan"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}