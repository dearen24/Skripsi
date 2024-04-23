"use client"
import ItemSemester from "./ItemMatkul";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getMatkul} from "../../actions/matkul";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";

export default function MainMatkul(){
    const [isLoading,setLoading] = useState(true);
    const [matkul, setMatkul] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getMatkul();
            setMatkul(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setMatkul(data);
        router.refresh();
        openToastTambah();
    }

    const addMatkul = () => {
        router.push("/admin/matkul/add");
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Mata Kuliah</h1>
                <button className="btn btn-dark my-1" onClick={addMatkul}>Tambah Mata Kuliah</button>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Kode</th>						
                                <th className="text-center">Nama</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {matkul.map((matakuliah)=>(
                            <ItemSemester key={matakuliah.id} matakuliah={matakuliah} matkul={matkul} setMatkul={changeData}/>
                        ))}
                    </table>
                </div>
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah"}/>
        </>
    )
}