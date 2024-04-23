"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { addAturanKonsumsi } from "@/app/actions/konsumsi";
import { FormSelect } from "react-bootstrap";

export default function AddAturan(){
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/aturankonsumsi");

    const add = async (formData:FormData) => {
        const response = await addAturanKonsumsi(formData);
        if(response==true){
            ref.current?.reset();
            openModal();
            openToast();
        }
        else{
            alert("Gagal menambahkan Aturan Konsumsi");
        }
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Aturan Konsumsi</h1>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Sebelum Pukul 12</label>
                                    <FormSelect name="sebelum12">
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Melewati Pukul 12</label>
                                    <FormSelect name="melewati12">
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </FormSelect>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Setelah Pukul 12</label>
                                    <FormSelect name="setelah12">
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Konsumsi</label>
                                    <FormSelect name="konsumsi">
                                        <option value="snack">Snack</option>
                                        <option value="lunch">Lunch</option>
                                    </FormSelect>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Aturan Konsumsi"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Aturan Konsumsi"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Aturan Konsumsi"}/>
        </>
    )
}