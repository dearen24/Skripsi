"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addMatkul } from "@/app/actions/matkul";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import ToastErrorInput from "../toast/ErrorInput";
import { MatkulSchema } from "@/modules/schema";

export default function AddMatkul(){
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

    const backToHomepage = () => router.push("/admin/matkul");

    const add = async (formData:FormData) => {
        const data = {
            kode: formData.get("kode"),
            nama: formData.get("nama")
        }

        const validation = MatkulSchema.safeParse(data);

        if(validation.success){
            const response = await addMatkul(formData);
            if(response==true){
                ref.current?.reset();
                openModal();
                openToast();
            }
            else{
                alert("Gagal menambahkan mata kuliah");
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
                    <h3><strong>Tambah Mata Kuliah</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kode Mata Kuliah</label>
                                    <input type="text" name="kode" className="form-control" placeholder="Masukan Kode Mata Kuliah" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Mata Kuliah</label>
                                    <input type="text" name="nama" className="form-control" placeholder="Masukan Nama Mata Kuliah" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Mata Kuliah"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Mata Kuliah"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Mata Kuliah"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}