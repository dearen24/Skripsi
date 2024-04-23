"use client"
import { useState, useEffect } from "react";
import { getOtherPengajuan } from "../../actions/tukarjadwal";
import ItemPengajuanLain from "./ItemPengajuanLain";
import { getSemester } from "@/app/actions/semester";
import { FormSelect } from "react-bootstrap";

export default function MainPengajuanLain({props}){
    const [isLoading,setLoading] = useState(true);
    const [pertukaran, setPertukaran] = useState();
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester, setSemester] = useState();
    const [selectedTipe, setSelectedTipe] = useState("UTS");
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const pertukaran = await getOtherPengajuan(session.id,session.semester,selectedTipe);
            const semester = await getSemester();

            setSemester(semester);
            setPertukaran(pertukaran);
            setLoading(false);
        };
        fetchData();
    }, []);

    const onChangeSemester = async (e) => {
        const pertukaranTemp = await getOtherPengajuan(session.id,e.target.value,selectedTipe);
        setPertukaran(pertukaranTemp);
        setSelectedSemester(e.target.value);
    }

    const onChangeTipe = async (e) => {
        const pertukaranTemp = await getOtherPengajuan(session.id,selectedSemester,e.target.value);
        setPertukaran(pertukaranTemp);
        setSelectedTipe(e.target.value);
    }

    if(isLoading){
        return <p>Loading</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengajuan Dosen Lain</h1>
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
                            <ItemPengajuanLain item={item}/>
                        ))}
                    </table>
                </div>
            </div>
        </>    
    )
}