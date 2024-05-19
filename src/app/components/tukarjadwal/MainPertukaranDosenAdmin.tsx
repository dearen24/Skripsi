"use client"
import { useState, useEffect } from "react";
import { getAllPengajuan, getMyPengajuan } from "../../actions/tukarjadwal"
import { useRouter } from "next/navigation";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import ItemPertukaranDosenAdmin from "./ItemPertukaranDosenAdmin";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";

export default function MainPertukaranAdmin({props}){
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
            const pertukaran = await getAllPengajuan(session.semester,selectedTipe);
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
        const pertukaranTemp = await getAllPengajuan(e.target.value,selectedTipe);
        setPertukaran(pertukaranTemp);
        setSelectedSemester(e.target.value);
    }

    const onChangeTipe = async (e) => {
        const pertukaranTemp = await getAllPengajuan(selectedSemester,e.target.value);
        setPertukaran(pertukaranTemp);
        setSelectedTipe(e.target.value);
    }

    const addPertukaran = () => {
        router.push("/admin/pertukarandosen/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Pengajuan Pertukaran Jadwal</strong></h3>
            </div>
            <div className="d-flex flex-row my-1 mx-1">
                <div>
                    <FormSelect onChange={onChangeSemester} style={{border:"2px solid black"}}>
                        {semester.map((sem)=>(
                            <option value={sem.id}>{sem.semester}</option>
                        ))}
                    </FormSelect>
                </div>
                <div className="px-1">
                    <FormSelect onChange={onChangeTipe} style={{border:"2px solid black"}}>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
                    </FormSelect>
                </div>
                <button className="btn btn-dark" onClick={addPertukaran} style={{backgroundColor:"#272829"}}><strong>Tambah Pertukaran</strong></button>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Yang Mengajukan</strong>
                            </Col>
                            <Col xs="1">
                                <strong></strong>
                            </Col>
                            <Col>
                                <strong>Yang Diajukan</strong>
                            </Col>
                            <Col>
                                <strong>Status</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {pertukaran.map((item)=>(
                    <ItemPertukaranDosenAdmin item={item} pertukaran={pertukaran} setPertukaran={changeData}/>
                ))}
            </div>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Pengajuan Dosen</h1>
    //             <div className="d-flex flex-row">
    //                 <div>
    //                     <FormSelect onChange={onChangeSemester}>
    //                         {semester.map((sem)=>(
    //                             <option value={sem.id}>{sem.semester}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //                 <div>
    //                     <FormSelect onChange={onChangeTipe}>
    //                         <option value="UTS">UTS</option>
    //                         <option value="UAS">UAS</option>
    //                     </FormSelect>
    //                 </div>
    //             </div>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Yang Mengajukan</th>
    //                             <th className="text-center"></th>					
    //                             <th className="text-center">Yang Diajukan</th>
    //                             <th className="text-center">Status</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     {pertukaran.map((item)=>(
    //                         <ItemPertukaranDosenAdmin item={item} pertukaran={pertukaran} setPertukaran={changeData}/>
    //                     ))}
    //                 </table>
    //             </div>
    //         </div>
    //     </>    
    // )
}