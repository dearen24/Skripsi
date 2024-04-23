"use client"
import ItemSemester from "./ItemSemester";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {getSemester} from "../../actions/semester";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";

export default function MainSemester(){
    const [isLoading,setLoading] = useState(true);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getSemester();
            setSemester(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setSemester(data);
        router.refresh();
        openToastTambah();
    }

    const addSemester = () => {
        router.push("/admin/semester/add");
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengguna</h1>
                <button className="btn btn-dark my-1" onClick={addSemester}>Tambah Semester</button>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama</th>						
                                <th className="text-center">Status</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {semester.map((sem)=>(
                            <ItemSemester key={sem.id} sem={sem} semester={semester} setSemester={changeData}/>
                        ))}
                    </table>
                </div>
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Semester"}/>
        </>
    )
}