"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { addRuangan } from "@/app/actions/ruangan";

export default function AddClass(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/ruangan");

    const add = async (formData:FormData) => {
        const response = await addRuangan(formData);
        //const response = true;
        if(response==true){
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
                    <h1>Tambah Ruangan</h1>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Ruangan</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Ruangan"/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kapasitas</label>
                                    <input type="number" name="kapasitas" className="form-control" placeholder="Masukan Kapasitas Ruangan"/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Jabatan"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Ruangan"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Ruangan"}/>
        </>
    )
}