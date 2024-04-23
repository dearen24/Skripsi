"use client"

import ItemMatkulUjian from "./ItemMatkulujian";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getMatkulUjian, getMatkulUjianBySemester} from "../../actions/matkulujian";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";

export default function MainMatkulUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [matkulujian, setMatkulujian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getMatkulUjianBySemester(props.semester.id);
            const semester = await getSemester();
            setSemester(semester);
            setMatkulujian(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setMatkulujian(data);
        router.refresh();
        openToastTambah();
    }

    const AddMatkulUjian = () => {
        router.push("/admin/matkulujian/add");
    }

    const handleChangeSemester = async (e) => {
        const idSemester = e.target.value;
        const data = await getMatkulUjianBySemester(idSemester);
        setMatkulujian(data);
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Mata Kuliah Ujian</h1>
                <div className="d-flex flex-row align-items-center">
                    <div>
                        <button className="btn btn-dark my-1" onClick={AddMatkulUjian}>Tambah Mata Kuliah Ujian</button>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={handleChangeSemester}>
                            {semester.map((sem)=>(
                                sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Semester</th>						
                                <th className="text-center">Mata Kuliah</th>
                                <th className="text-center">Dosen Pengajar</th>
                                <th className="text-center">Jumlah Peserta</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {matkulujian.map((matkulu)=>(
                            <ItemMatkulUjian key={matkulu.id} matkulujian={matkulu} allmatkulujian={matkulujian} setMatkulujian={changeData}/>
                        ))}
                    </table>
                </div>
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah Ujian"}/>
        </>
    )
}