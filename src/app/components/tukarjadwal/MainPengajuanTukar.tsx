"use client"
import { useState, useEffect } from "react";
import { getMyJadwal, getMyPengajuan, getOtherJadwal, insertPertukaran } from "../../actions/tukarjadwal"
import ItemPengajuanSaya from "./ItemPengajuanSaya";
import { Card, Col, FormSelect, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import ItemJadwalSaya from "./ItemJadwalSaya";
import ItemJadwalDosenLain from "./ItemJadwalDosenLain";
import { getSemester } from "@/app/actions/semester";
import MakePertukaranModal from "../modal/MakePertukaranConfirmation";
import ToastSuccessMakePertukaran from "../toast/SuccessMakePertukaran";
import ModalCannotMakePertukaran from "../modal/CannotMakePertukaran";
import LoadingPage from "../LoadingPage";

export default function MainPengajuanTukar({props}){
    const [isLoading,setLoading] = useState(true);
    const [jadwalSaya, setJadwalSaya] = useState();
    const [jadwalDosenLain, setJadwalDosenLain] = useState();
    const [selectedJadwalSaya, setSelectedJadwalSaya] = useState("");
    const [selectedJadwalDosenLain, setSelectedJadwalDosenLain] = useState("");
    const [key,setKey] = useState('jadwalsaya');
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester,setSemester] = useState();
    const [selectedSemester,setSelectedSemester] = useState(props.semester.id);
    const [selectedTipe,setSelectedTipe] = useState("UTS");
    const [modal, setModal] = useState(false);
    const [modalFailed, setModalFailed] = useState(false);
    const [toast,setToast] = useState(false);

    const openModal = () => {
        if(selectedJadwalSaya==""||selectedJadwalDosenLain==""){
            setModalFailed(true);
        }
        else{
            setModal(true);
        }
    };

    const closeModal = () => setModal(false);
    const closeModalFailed = () => setModalFailed(false);
    const openToast = () => setToast(true);
    const closeToast = () => setToast(false);


    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const jadwalSaya = await getMyJadwal(session.id,session.semester);
            const jadwalDosenLain = await getOtherJadwal(session.id,session.semester);
            const semester = await getSemester();
            const arrSaya = [];
            const arrDosenLain = [];

            for(let i = 0;i<jadwalSaya.length;i++){
                if(jadwalSaya[i].ujian.tipe.toString()==selectedTipe){
                    arrSaya.push(jadwalSaya[i]);
                }
            }

            for(let i = 0;i<jadwalDosenLain.length;i++){
                if(jadwalDosenLain[i].ujian.tipe.toString()==selectedTipe){
                    arrDosenLain.push(jadwalDosenLain[i]);
                }
            }

            setSemester(semester);
            setJadwalSaya(arrSaya);
            setJadwalDosenLain(arrDosenLain);
            setLoading(false);
        };
        fetchData();
    }, []);

    const buatPertukaran = async () => {
        await insertPertukaran(selectedJadwalSaya,selectedJadwalDosenLain,session.semester);
        openToast();
        closeModal();
    }

    const onChangeSemester = async (e) => {
        const jadwalSayaTemp = await getMyJadwal(session.id,e.target.value);
        const jadwalDosenLainTemp = await getOtherJadwal(session.id,e.target.value);
        const arrSaya = [];
        const arrDosenLain = [];

        for(let i = 0;i<jadwalSayaTemp.length;i++){
            if(jadwalSayaTemp[i].ujian.tipe.toString()==selectedTipe){
                arrSaya.push(jadwalSayaTemp[i]);
            }
        }

        for(let i = 0;i<jadwalDosenLainTemp.length;i++){
            if(jadwalDosenLainTemp[i].ujian.tipe.toString()==selectedTipe){
                arrDosenLain.push(jadwalDosenLainTemp[i]);
            }
        }
        
        setSelectedSemester(e.target.value);
        setJadwalSaya(arrSaya);
        setJadwalDosenLain(arrDosenLain);
    }

    const onChangeTipe = async (e) => {
        const jadwalSaya = await getMyJadwal(session.id,selectedSemester);
        const jadwalDosenLain = await getOtherJadwal(session.id,selectedSemester);
        const arrSaya = [];
        const arrDosenLain = [];

        for(let i = 0;i<jadwalSaya.length;i++){
            if(jadwalSaya[i].ujian.tipe.toString()==e.target.value){
                arrSaya.push(jadwalSaya[i]);
            }
        }

        for(let i = 0;i<jadwalDosenLain.length;i++){
            if(jadwalDosenLain[i].ujian.tipe.toString()==e.target.value){
                arrDosenLain.push(jadwalDosenLain[i]);
            }
        }
        
        setSelectedTipe(e.target.value);
        setJadwalSaya(arrSaya);
        setJadwalDosenLain(arrDosenLain);
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h3 className="mx-1"><strong>Pengajuan Pertukaran</strong></h3>
                <div className="d-flex flex-row">
                    <div className="px-1">
                        <FormSelect onChange={onChangeSemester} style={{border:"2px solid black"}}>
                            {semester.map((sem)=>(
                                <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div>
                        <FormSelect onChange={onChangeTipe} style={{border:"2px solid black"}}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <div className="mx-1">
                    <div className="d-flex flex-row my-1">
                        <Card className="px-2" style={{border:"2px solid black"}}>
                            <Row className="align-items-center">
                                <Col md="auto">
                                    <h6 className="my-2">Dari:</h6>
                                </Col>
                                {jadwalSaya.map((jadwal)=>(
                                    selectedJadwalSaya == jadwal.id ?
                                    <>
                                    <Col md="auto">
                                        <h6 className="my-2">{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</h6>
                                    </Col>
                                    <Col md="auto">
                                        <h6 className="my-2">{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</h6>
                                    </Col>
                                    <Col md="auto">
                                        {jadwal.ujian.matkul.map((matkul)=>(
                                            <h6 className="my-2">{matkul.nama}</h6>
                                        ))}
                                    </Col>
                                    <Col md="auto">
                                        <h6 className="my-2">{jadwal.ruangan.nama}</h6>
                                    </Col>
                                    </>
                                    :
                                    null
                                ))}
                            </Row>
                        </Card>
                    </div>
                    <div className="d-flex flex-row my-1">
                        <Card className="px-2" style={{border:"2px solid black"}}>
                            <Row className="align-items-center">
                                    <Col md="auto">
                                        <h6 className="my-2">Ke:</h6>
                                    </Col>
                                    {jadwalDosenLain.map((jadwal)=>(
                                        selectedJadwalDosenLain == jadwal.id ?
                                        <>
                                        <Col md="auto">
                                            <h6 className="my-2">{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</h6>
                                        </Col>
                                        <Col md="auto">
                                            <h6 className="my-2">{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</h6>
                                        </Col>
                                        <Col md="auto">
                                            {jadwal.ujian.matkul.map((matkul)=>(
                                                <h6 className="my-2">{matkul.nama}</h6>
                                            ))}
                                        </Col>
                                        <Col md="auto">
                                            <h6 className="my-2">{jadwal.ruangan.nama}</h6>
                                        </Col>
                                        <Col md="auto">
                                            <h6 className="my-2">{jadwal.dosen.nama}</h6>
                                        </Col>
                                        </>
                                        :
                                        null
                                    ))}
                            </Row>
                        </Card>
                    </div>
                </div>
                <button className="btn my-1 mx-1" onClick={openModal} style={{backgroundColor:"#272829", color:"white"}}>Ajukan Pertukaran</button>
                <div className="mx-1">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="jadwalsaya" title="Jadwal Saya">
                            <ItemJadwalSaya selectedJadwalSaya={selectedJadwalSaya} setSelectedJadwalSaya={setSelectedJadwalSaya} jadwalsaya={jadwalSaya}/>
                        </Tab>
                        <Tab eventKey="jadwaldosenlain" title="Jadwal Dosen Lain">
                            <ItemJadwalDosenLain selectedJadwalDosenLain={selectedJadwalDosenLain} setSelectedJadwalDosenLain={setSelectedJadwalDosenLain} jadwaldosenlain={jadwalDosenLain}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <MakePertukaranModal modal={modal} closeModal={closeModal} onAction={buatPertukaran}/>
            <ModalCannotMakePertukaran modal={modalFailed} closeModal={closeModalFailed}/>
            <ToastSuccessMakePertukaran toast={toast} closeToast={closeToast}/>
        </>    
    )
}