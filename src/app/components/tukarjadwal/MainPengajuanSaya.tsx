"use client"
import { useState, useEffect } from "react";
import { getMyPengajuan } from "../../actions/tukarjadwal"
import ItemPengajuanSaya from "./ItemPengajuanSaya";
import { useRouter } from "next/navigation";
import { getSemester } from "@/app/actions/semester";
import { FormSelect } from "react-bootstrap";

export default function MainPengajuanSaya({props}){
    const [isLoading,setLoading] = useState(true);
    const [pertukaran, setPertukaran] = useState();
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester, setSemester] = useState();
    const [selectedTipe, setSelectedTipe] = useState("UTS");
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);
    const router = useRouter();

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const pertukaran = await getMyPengajuan(session.id,session.semester,selectedTipe);
            const semester = await getSemester();

            setSemester(semester);
            setPertukaran(pertukaran);
            setLoading(false);
        };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setPertukaran(data);
        router.refresh();
        //openToastTambah();
    }

    const onChangeSemester = async (e) => {
        const pertukaranTemp = await getMyPengajuan(session.id,e.target.value,selectedTipe);
        setPertukaran(pertukaranTemp);
        setSelectedSemester(e.target.value);
    }

    const onChangeTipe = async (e) => {
        const pertukaranTemp = await getMyPengajuan(session.id,selectedSemester,e.target.value);
        setPertukaran(pertukaranTemp);
        setSelectedTipe(e.target.value);
    }

    if(isLoading){
        return <p>Loading</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengajuan Saya</h1>
                <div className="d-flex flex-row">
                    <div>
                        <FormSelect onChange={onChangeSemester}>
                            {semester.map((sem)=>(
                                <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div>
                        <FormSelect onChange={onChangeTipe}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Dari</th>
                                <th className="text-center"></th>					
                                <th className="text-center">Ke</th>
                                <th className="text-center">Status</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {pertukaran.map((item)=>(
                            <ItemPengajuanSaya item={item} pertukaran={pertukaran} setPertukaran={changeData}/>
                        ))}
                    </table>
                </div>
            </div>
        </>    
    )
}