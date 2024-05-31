"use client"
import { useState, useEffect } from "react";
import { getMyPengajuan, getOtherPengajuan } from "../../actions/tukarjadwal"
import { useRouter } from "next/navigation";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import { getPergantianJadwal } from "@/app/actions/gantijadwal";
import { getSemester } from "@/app/actions/semester";
import ItemListGantiJadwal from "./ItemListGantiJadwal";

export default function MainListGantiJadwal({props}){
    const [isLoading,setLoading] = useState(true);
    const [pergantian, setPergantian] = useState();
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester, setSemester] = useState(new Object);
    const [selectedTipe, setSelectedTipe] = useState("UTS");
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);
    const router = useRouter();

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const semester = await getSemester();
            const data = await getPergantianJadwal(selectedSemester,selectedTipe);
            
            setSemester(semester);
            setPergantian(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const onChangeSemester = async (e) => {
        const data = await getPergantianJadwal(e.target.value,selectedTipe);
        setPergantian(data);
        setSelectedSemester(e.target.value);
    }

    const onChangeTipe = async (e) => {
        const data = await getPergantianJadwal(selectedSemester,e.target.value);
        setPergantian(data);
        setSelectedTipe(e.target.value);
    }

    const addPergantian = async (e) => {
        router.push("/admin/pergantiandosen/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Pergantian Jadwal</strong></h3>
            </div>
            <div className="d-flex flex-row my-1 mx-1">
                <div>
                    <FormSelect onChange={onChangeSemester} style={{border:"2px solid black"}}>
                        {semester.map((sem)=>(
                            sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                        ))}
                    </FormSelect>
                </div>
                <div className="px-1">
                    <FormSelect onChange={onChangeTipe} style={{border:"2px solid black"}}>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
                        <option value="Pendek">Pendek</option>
                    </FormSelect>
                </div>
                <button className="btn btn-dark" onClick={addPergantian} style={{backgroundColor:"#272829"}}><strong>Buat Pergantian</strong></button>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Ujian</strong>
                            </Col>
                            <Col>
                                <strong>Pengawas Semula</strong>
                            </Col>
                            <Col>
                                <strong>Pengawas Menggantikan</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {pergantian.map((perg)=>(
                    <ItemListGantiJadwal pergantian={perg}/>
                ))}
            </div>
        </div>
    )
}