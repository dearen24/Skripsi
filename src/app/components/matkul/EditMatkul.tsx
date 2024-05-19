"use client"
import { useEffect, useState } from "react";
import { editMatkul, getMatkulById } from "../../actions/matkul";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import LoadingPage from "../LoadingPage";
import ToastErrorInput from "../toast/ErrorInput";
import { MatkulSchema } from "@/modules/schema";

export default function EditMatkul({params}){
    const [isLoading,setLoading] = useState(true);
    const [matkul,setMatkul] = useState();
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getMatkulById(params);
                setMatkul(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const data = {
            kode: formData.get("kode"),
            nama: formData.get("nama")
        }

        const validation = MatkulSchema.safeParse(data);

        if(validation.success){
            const response = await editMatkul(formData,params);
            if(response==true){
                openToast();
            }
            else{
                alert("Gagal Mengubah Mata Kuliah");
            }
        }
        else{
            setError(validation.error.issues);
            openToastError();
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Mata Kuliah</strong></h3>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kode Mata Kuliah</label>
                                    <input type="text" name="kode" className="form-control" defaultValue={matkul?.kode} placeholder="Masukan kode mata kuliah" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Mata Kuliah</label>
                                    <input type="text" name="nama" className="form-control" defaultValue={matkul?.nama} placeholder="Masukan nama mata kuliah" style={{border:"2px solid black"}}/>
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

            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}