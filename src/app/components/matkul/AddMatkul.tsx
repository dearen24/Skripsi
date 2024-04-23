"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addMatkul } from "@/app/actions/matkul";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";

export default function AddMatkul(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/matkul");

    const add = async (formData:FormData) => {
        const response = await addMatkul(formData);
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
                    <h1>Tambah Mata Kuliah</h1>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kode Mata Kuliah</label>
                                    <input type="text" name="kode" className="form-control" placeholder="Masukan Kode Mata Kuliah"/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Mata Kuliah</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Mata Kuliah"/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Mata Kuliah"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Mata Kuliah"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Mata Kuliah"}/>
        </>
    )
}