"use client"
import { useEffect, useState } from "react";
import { editJabatan, getJabatanById } from "../../actions/jabatan";
import { CloseButton, FormSelect, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { editAturanKonsumsi, getAturanKonsumsiById } from "@/app/actions/konsumsi";

export default function EditAturan({params}){
    const [isLoadingJabatan,setLoadingJabatan] = useState(true);
    const [aturan,setAturan] = useState();
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

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
        const response = await editAturanKonsumsi(formData,params);
        //const response = true;
        if(response==true){
            openToast();
        }
        else{
            alert("Gagal Mengubah Aturan Konsumsi");
        }
    }

    if(isLoadingJabatan){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Ubah Aturan Konsumsi</h1>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Sebelum Pukul 12</label>
                                    <FormSelect name="sebelum12">
                                        {aturan.sebelum12==false ? <option value="false" selected>False</option> : <option value="false">False</option>}
                                        {aturan.sebelum12==true ? <option value="true" selected>True</option> : <option value="true">True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Melewati Pukul 12</label>
                                    <FormSelect name="melewati12">
                                        {aturan.melewati12==false ? <option value="false" selected>False</option> : <option value="false">False</option>}
                                        {aturan.melewati12==true ? <option value="true" selected>True</option> : <option value="true">True</option>}
                                    </FormSelect>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Setelah Pukul 12</label>
                                    <FormSelect name="setelah12">
                                        {aturan.setelah12==false ? <option value="false" selected>False</option> : <option value="false">False</option>}
                                        {aturan.setelah12==true ? <option value="true" selected>True</option> : <option value="true">True</option>}
                                    </FormSelect>
                                </div>
                                <div className="form-group w-50">
                                    <label>Konsumsi</label>
                                    <FormSelect name="konsumsi">
                                        {aturan.konsumsi.toString()=="snack" ? <option value="snack" selected>Snack</option> : <option value="snack">Snack</option>}
                                        {aturan.konsumsi.toString()=="lunch" ? <option value="lunch" selected>Lunch</option> : <option value="lunch">Lunch</option>}
                                    </FormSelect>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-warning w-100 my-2">
                        <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                        Simpan Perubahan
                    </button>
                    </form>
                </div>
            </div>

            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
        </>
    )
}