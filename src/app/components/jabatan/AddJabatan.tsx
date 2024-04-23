"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addJabatan } from "@/app/actions/jabatan";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";

export default function AddRole(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/jabatan");

    const add = async (formData:FormData) => {
        const response = await addJabatan(formData);
        if(true){
            ref.current?.reset();
            openModal();
            openToast();
        }
        else{
            alert("Gagal menambahkan jabatan");
        }
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Jabatan</h1>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Jabatan</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Jabatan"/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kuota Mengawas</label>
                                    <input type="number" name="kuotaMengawas" className="form-control" placeholder="Masukan Kuota Mengawas"/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Jabatan"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Jabatan"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Jabatan"}/>
        </>
    )
}