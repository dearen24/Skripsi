"use client"

import ItemDosen from "./ItemUjian";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getUjian, getUjianBySemester} from "../../actions/ujian"
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemUjian from "./ItemUjian";
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";

export default function MainUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [selectedData,setSelectedData] = useState({semester:props.semester.id,tipe:"UTS"});
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUjianBySemester(selectedData.semester,selectedData.tipe);
            const semester = await getSemester();
            setSemester(semester);
            setUjian(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setUjian(data);
        router.refresh();
        openToastTambah();
    }

    const addUjian = () => {
        router.push("/admin/ujian/add");
    }

    const handleChangeSemester = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.semester = e.target.value;
        const data = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        setSelectedData(dataTemp);
        setUjian(data);
    }

    const handleChangeTipe = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.tipe = e.target.value;
        const data = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        setSelectedData(dataTemp);
        setUjian(data);
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Ujian</h1>
                <div className="d-flex flex-row align-items-center">
                    <div>
                        <button className="btn btn-dark my-1" onClick={addUjian}>Tambah Ujian</button>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={handleChangeSemester}>
                            {semester.map((sem)=>(
                                sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={handleChangeTipe}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Tanggal</th>						
                                <th className="text-center">Waktu Mulai</th>
                                <th className="text-center">Waktu Selesai</th>
                                <th className="text-center">Tipe Ujian</th>
                                <th className="text-center">Metode Ujian</th>
                                <th className="text-center">Shift</th>
                                <th className="text-center">Semester</th>
                                <th className="text-center">Mata Kuliah</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {ujian.map((u)=>(
                            <ItemUjian key={u.id} ujian={u} allUjian={ujian} setUjian={changeData}/>
                        ))}
                    </table>
                </div>
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ujian"}/>
        </>
    )
}