"use client"
import { useState, useEffect } from "react";
import { getRuangan } from "@/app/actions/ruangan";
import { useRouter } from "next/navigation";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemRuangan from "./ItemRuangan";
import ItemJabatan from "../jabatan/ItemJabatan";


export default function MainRuangan(){
    const [isLoading,setLoading] = useState(true);
    const [ruangan, setRuangan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getRuangan();
                setRuangan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setRuangan(data);
        router.refresh();
        openToastTambah();
    }
    
    const addRuangan = () => {
        router.push("/admin/ruangan/add");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Ruangan</h1>
                <button className="btn btn-dark my-1" onClick={addRuangan}>Tambah Ruangan</button>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Nama</th>						
                                <th className="text-center">Kapasitas</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {ruangan.map((classroom)=>(
                            <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
                        ))}
                    </table>
                </div>
            </div> 

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ruangan"}/>
        </>
    )
}