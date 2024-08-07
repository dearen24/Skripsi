"use client"
import { useState, useEffect } from "react";
import { getMyPengajuan, getOtherPengajuan } from "../../actions/tukarjadwal";
import ItemPengajuanLain from "./ItemPengajuanLain";
import { getSemester } from "@/app/actions/semester";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

export default function MainPengajuanLain({props}){
    const [isLoading,setLoading] = useState(true);
    const [pertukaranSaya, setPertukaranSaya] = useState();
    const [pertukaranLain, setPertukaranLain] = useState();
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester, setSemester] = useState();
    const [selectedTipe, setSelectedTipe] = useState("UTS");
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const pertukaranLain = await getOtherPengajuan(session.id,session.semester,selectedTipe);
            const pertukaranSaya = await getMyPengajuan(session.id,session.semester,selectedTipe);
            const semester = await getSemester();

            setSemester(semester);
            setPertukaranLain(pertukaranLain);
            setPertukaranSaya(pertukaranSaya);
            setLoading(false);
        };
        fetchData();
    }, []);

    const onChangeSemester = async (e) => {
        const pertukaranLainTemp = await getOtherPengajuan(session.id,e.target.value,selectedTipe);
        const pertukaranSayaTemp = await getMyPengajuan(session.id,e.target.value,selectedTipe)
        setPertukaranLain(pertukaranLainTemp);
        setPertukaranSaya(pertukaranSayaTemp);
        setSelectedSemester(e.target.value);
    }

    const onChangeTipe = async (e) => {
        const pertukaranLainTemp = await getOtherPengajuan(session.id,selectedSemester,e.target.value);
        const pertukaranSayaTemp = await getMyPengajuan(session.id,selectedSemester,e.target.value);
        setPertukaranLain(pertukaranLainTemp);
        setPertukaranSaya(pertukaranSayaTemp);
        setSelectedTipe(e.target.value);
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Pengajuan Dosen Lain</strong></h3>
            </div>
            <div className="d-flex flex-row my-1 mx-1">
                <div>
                    <FormSelect onChange={onChangeSemester} style={{border:"2px solid black", cursor:"pointer"}}>
                        {semester.map((sem)=>(
                            sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                        ))}
                    </FormSelect>
                </div>
                <div className="px-1">
                    <FormSelect onChange={onChangeTipe} style={{border:"2px solid black", cursor:"pointer"}}>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
                        <option value="Pendek">Pendek</option>
                    </FormSelect>
                </div>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Dari</strong>
                            </Col>
                            <Col xs="1">
                                <strong></strong>
                            </Col>
                            <Col>
                                <strong>Ke</strong>
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
                {pertukaranLain.map((item)=>(
                    item.pertukaran.statusDosen2!="Disetujui"||item.pertukaran.statusAdmin!="Disetujui" ?
                        <ItemPengajuanLain item={item}/>
                    :
                        null 
                ))}
                {pertukaranSaya.map((item)=>(
                    item.pertukaran.statusDosen2=="Disetujui"&&item.pertukaran.statusAdmin=="Disetujui" ?
                        <ItemPengajuanLain item={item}/>
                    :
                        null 
                ))}
            </div>
        </div>
    )
}