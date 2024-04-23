"use client"
import { useEffect, useState } from "react";
import { editMatkul, getMatkulById } from "../../actions/matkul";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";

export default function EditMatkul({params}){
    const [isLoading,setLoading] = useState(true);
    const [matkul,setMatkul] = useState();
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

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
        const response = await editMatkul(formData,params);
        // const response = true;
        if(response==true){
            openToast();
        }
        else{
            alert("Gagal Mengubah Jabatan");
        }
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Ubah Mata Kuliah</h1>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kode Mata Kuliah</label>
                                    <input type="text" name="kode" className="form-control" defaultValue={matkul?.kode}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Mata Kuliah</label>
                                    <input type="text" name="nama" className="form-control" defaultValue={matkul?.nama}/>
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