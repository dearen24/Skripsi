"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemAturan from "./ItemAturan";
import { getAturanKonsumsiAll } from "@/app/actions/konsumsi";

export default function MainAturan(){
    const [isLoading,setLoading] = useState(true);
    const [aturan, setAturan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getAturanKonsumsiAll();
                setAturan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setAturan(data);
        router.refresh();
        openToastTambah();
    }
    
    const addAturan = () => {
        router.push("/admin/aturankonsumsi/add");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Aturan Konsumsi</h1>
                <button className="btn btn-dark my-1" onClick={addAturan}>Tambah Aturan</button>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Sebelum Pukul 12</th>						
                                <th className="text-center">Melewati Pukul 12</th>
                                <th className="text-center">Setelah Pukul 12</th>
                                <th className="text-center">Konsumsi</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {aturan.map((rule,index)=>(
                            <ItemAturan key={rule.id} index={index} rule={rule} aturan={aturan} setAturan={changeData} />
                        ))}
                    </table>
                </div>
            </div> 

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Aturan Konsumsi"}/>
        </>
    )
}