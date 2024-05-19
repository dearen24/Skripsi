"use client"
import { useEffect, useState } from "react";
import { FormSelect } from "react-bootstrap";
import Image from "next/image";
import { editAturanKonsumsi, getAturanKonsumsiById } from "@/app/actions/konsumsi";
import LoadingPage from "../LoadingPage";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { AturanKonsusmiSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function EditAturan({params}){
    const [isLoadingJabatan,setLoadingJabatan] = useState(true);
    const [aturan,setAturan] = useState();
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getAturanKonsumsiById(params);
                setAturan(data);
                setLoadingJabatan(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const data = {
            delapanSepuluh: Number(formData.get("delapanSepuluh")),
            sepuluhDuaBelas: Number(formData.get("sepuluhDuaBelas")),
            duaBelasDua: Number(formData.get("duaBelasDua")),
            sebelasTigaBelas: Number(formData.get("sebelasTigaBelas")),
            duaEmpat:Number(formData.get("duaEmpat")),
            lunch: Number(formData.get("lunch")),
            snack: Number(formData.get("snack")),
        }
        const validation = AturanKonsusmiSchema.safeParse(data);

        if(validation.success){
            const response = await editAturanKonsumsi(formData,params);
            if(response==true){
                openToast();
            }
            else{
                alert("Gagal Mengubah Aturan Konsumsi");
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
                    <h3><strong>Ubah Aturan Konsumsi</strong></h3>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>8 - 10</label>
                                    <FormSelect name="delapanSepuluh" style={{border:"2px solid black"}}>
                                        {aturan.delapanSepuluh==false ? <option value={0} selected>False</option> : <option value={0}>False</option>}
                                        {aturan.delapanSepuluh==true ? <option value={1} selected>True</option> : <option value={1}>True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>10 - 12</label>
                                    <FormSelect name="sepuluhDuaBelas" style={{border:"2px solid black"}}>
                                        {aturan.sepuluhDuaBelas==false ? <option value={0} selected>False</option> : <option value={0}>False</option>}
                                        {aturan.sepuluhDuaBelas==true ? <option value={1} selected>True</option> : <option value={1}>True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>11 - 13</label>
                                    <FormSelect name="sebelasTigaBelas" style={{border:"2px solid black"}}>
                                        {aturan.sebelasTigaBelas==false ? <option value={0} selected>False</option> : <option value={0}>False</option>}
                                        {aturan.sebelasTigaBelas==true ? <option value={1} selected>True</option> : <option value={1}>True</option>}
                                    </FormSelect>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>12 - 14</label>
                                    <FormSelect name="duaBelasDua" style={{border:"2px solid black"}}>
                                        {aturan.duaBelasDua==false ? <option value={0} selected>False</option> : <option value={0}>False</option>}
                                        {aturan.duaBelasDua==true ? <option value={1} selected>True</option> : <option value={1}>True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>14 - 16</label>
                                    <FormSelect name="duaEmpat" style={{border:"2px solid black"}}>
                                        {aturan.duaEmpat==false ? <option value={0} selected>False</option> : <option value={0}>False</option>}
                                        {aturan.duaEmpat==true ? <option value={1} selected>True</option> : <option value={1}>True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                        <label>Jumlah Snack</label>
                                        <input type="number" name="snack" className="form-control" placeholder="Masukan Jumlah Snack" defaultValue={aturan.lunch} style={{border:"2px solid black"}}/>
                                    </div>
                                    <div className="form-group w-50">
                                        <label>Jumlah Makan Siang</label>
                                        <input type="number" name="lunch" className="form-control" placeholder="Masukan Jumlah Makan Siang" defaultValue={aturan.snack} style={{border:"2px solid black"}}/>
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

            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
        </>
    )
}