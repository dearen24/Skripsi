"use client"
import { useState, useEffect } from "react";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";
import { getJabatan } from "@/app/actions/jabatan";
import { useRouter } from "next/navigation";
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessDelete from "../toast/SuccessDelete";


export default function MainJabatan(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan, setJabatan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getJabatan();
                setJabatan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setJabatan(data);
        router.refresh();
        openToastTambah();
    }
    
    const addJabatan = () => {
        router.push("/admin/jabatan/add");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Jabatan</h1>
                <button className="btn btn-dark my-1" onClick={addJabatan}>Tambah Jabatan</button>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Nama</th>						
                                <th className="text-center">Kouta Mengawas</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {jabatan.map((role)=>(
                            <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
                        ))}
                    </table>
                </div>
            </div> 

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Jabatan"}/>
        </>
    )
}