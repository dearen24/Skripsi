"use client"
import { useEffect, useState } from "react";
import { editRuangan, getRuanganById } from "../../actions/ruangan";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";

export default function EditClass({params}){
    const [isLoading,setLoading] = useState(true);
    const [ruangan,setRuangan] = useState();
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getRuanganById(params);
                setRuangan(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const edit = async (formData:FormData) => {
        const response = await editRuangan(formData,params);
        //const response = true;
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
                    <h1>Ubah Ruangan</h1>
                </div>
                <div>
                    <form action={edit}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Ruangan</label>
                                    <input type="text" name="nama" className="form-control" defaultValue={ruangan?.nama}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Kapasitas</label>
                                    <input type="number" name="kapasitas" className="form-control" defaultValue={ruangan?.kapasitas}/>
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