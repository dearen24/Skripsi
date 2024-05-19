"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { addAturanKonsumsi } from "@/app/actions/konsumsi";
import { FormSelect } from "react-bootstrap";
import ToastErrorInput from "../toast/ErrorInput";
import { AturanKonsusmiSchema } from "@/modules/schema";

export default function AddAturan(){
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

    const backToHomepage = () => router.push("/admin/aturankonsumsi");

    const add = async (formData:FormData) => {
        const data = {
            delapanSepuluh: Number(formData.get("delapanSepuluh")),
            sepuluhDuaBelas: Number(formData.get("sepuluhDuaBelas")),
            duaBelasDua: Number(formData.get("duaBelasDua")),
            sebelasTigaBelas: Number(formData.get("sebelasTigaBelas")),
            duaEmpat: Number(formData.get("duaEmpat")),
            lunch: Number(formData.get("lunch")),
            snack: Number(formData.get("snack")),
        }
        const validation = AturanKonsusmiSchema.safeParse(data);

        if(validation.success){
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
        else{
            setError(validation.error.issues);
            openToastError();
        }  
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Aturan Konsumsi</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>8 - 10</label>
                                    <FormSelect name="delapanSepuluh" style={{border:"2px solid black"}}>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>10 - 12</label>
                                    <FormSelect name="sepuluhDuaBelas" style={{border:"2px solid black"}}>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>11 - 13</label>
                                    <FormSelect name="sebelasTigaBelas" style={{border:"2px solid black"}}>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </FormSelect>
                                </div>
                            </div>
                            <div className="w-50">
                            <div className="form-group w-50">
                                    <label>12 - 14</label>
                                    <FormSelect name="duaBelasDua" style={{border:"2px solid black"}}>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>14 - 16</label>
                                    <FormSelect name="duaEmpat" style={{border:"2px solid black"}}>
                                        <option value={0}>False</option>
                                        <option value={1}>True</option>
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Jumlah Snack</label>
                                    <input type="number" name="snack" className="form-control" placeholder="Masukan Jumlah Snack" style={{border:"2px solid black"}}/>
                                </div>
                                <div className="form-group w-50">
                                    <label>Jumlah Makan Siang</label>
                                    <input type="number" name="lunch" className="form-control" placeholder="Masukan Jumlah Makan Siang" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Aturan Konsumsi"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Aturan Konsumsi"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Aturan Konsumsi"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}