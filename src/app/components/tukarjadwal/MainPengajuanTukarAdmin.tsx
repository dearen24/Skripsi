"use client"
import { useState, useEffect } from "react";
import { getAllJadwal, insertPertukaran, insertPertukaranAdmin, tukarJadwal} from "../../actions/tukarjadwal";
import { Card, Col, FormSelect, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import ItemJadwalDosenAdmin from "./ItemJadwalDosenAdmin";
import ItemJadwalDosenLain from "./ItemJadwalDosenLain";
import { getSemester } from "@/app/actions/semester";
import MakePertukaranModal from "../modal/MakePertukaranConfirmation";
import ToastSuccessMakePertukaran from "../toast/SuccessMakePertukaran";
import ModalCannotMakePertukaran from "../modal/CannotMakePertukaran";
import LoadingPage from "../LoadingPage";
import { useRouter } from "next/navigation";
import { getDatesBySemester } from "@/app/actions/ujian";
import MakePertukaranAdminModal from "../modal/MakePertukaranConfirmationAdmin";
import ToastSuccessMakePertukaranAdmin from "../toast/SuccessMakePertukaranAdmin";
import ModalCannotMakePertukaranSameId from "../modal/CannotMakePertukaranSameId";

export default function MainPengajuanTukarAdmin({props}){
    const [isLoading,setLoading] = useState(true);
    const [jadwalDosen1, setJadwalDosen1] = useState();
    const [jadwalDosen2, setJadwalDosen2] = useState();
    const [selectedJadwalDosen1, setSelectedJadwalDosen1] = useState("");
    const [selectedJadwalDosen2, setSelectedJadwalDosen2] = useState("");
    const [key,setKey] = useState('jadwalsaya');
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester,setSemester] = useState();
    const [selectedSemester,setSelectedSemester] = useState(props.semester.id);
    const [selectedTipe,setSelectedTipe] = useState("UTS");
    const [modal, setModal] = useState(false);
    const [modalFailed, setModalFailed] = useState(false);
    const [modalFailedSameId, setModalFailedSameId] = useState(false);
    const [toast,setToast] = useState(false);
    const [dates,setDates] = useState(new Object);
    const [selectedDateDosen1,setSelectedDateDosen1] = useState("");
    const [selectedDateDosen2,setSelectedDateDosen2] = useState("");

    const openModal = () => {
        if(selectedJadwalDosen1==""||selectedJadwalDosen2==""){
            setModalFailed(true);
        }
        else if(selectedJadwalDosen1==selectedJadwalDosen2){
            setModalFailedSameId(true);
        }
        else{
            setModal(true);
        }
    };

    const closeModal = () => setModal(false);
    const closeModalFailed = () => setModalFailed(false);
    const closeModalFailedSameId = () => setModalFailedSameId(false);
    const openToast = () => setToast(true);
    const closeToast = () => setToast(false);


    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const jadwalDosen1 = await getAllJadwal(selectedSemester,selectedTipe);
            const jadwalDosen2 = await getAllJadwal(selectedSemester,selectedTipe);
            const semester = await getSemester();
            const date = await getDatesBySemester(session.semester,selectedTipe);  

            setDates(date);
            setSelectedDateDosen1(date[0].date.toISOString());
            setSelectedDateDosen2(date[0].date.toISOString());
            setSemester(semester);
            setJadwalDosen1(jadwalDosen1);
            setJadwalDosen2(jadwalDosen2);
            setLoading(false);
        };
        fetchData();
    }, []);

    const buatPertukaranTukarKonsumsi = async () => {
        const indexDosen1 = jadwalDosen1.findIndex(a=>a.id==selectedJadwalDosen1);
        const indexDosen2 = jadwalDosen1.findIndex(a=>a.id==selectedJadwalDosen2);
        if(indexDosen1!=-1&&indexDosen2!=-1){
            const response1 = await insertPertukaranAdmin(selectedJadwalDosen1,selectedJadwalDosen2,session.semester);
            const response2 = await tukarJadwal(selectedJadwalDosen1,jadwalDosen1[indexDosen1].idDosen,selectedJadwalDosen2,jadwalDosen2[indexDosen2].idDosen,session.semester,true);
            if(response1&&response2){
                openToast();
                closeModal();
                setSelectedJadwalDosen1("");
                setSelectedJadwalDosen2("");
            }
            else{
                alert("gagal membuat pertukaran"); 
            }
        }
        else{
            alert("gagal membuat pertukaran");
        }
    }

    const buatPertukaranTidakTukarKonsumsi = async () => {
        const indexDosen1 = jadwalDosen1.findIndex(a=>a.id==selectedJadwalDosen1);
        const indexDosen2 = jadwalDosen1.findIndex(a=>a.id==selectedJadwalDosen2);
        if(indexDosen1!=-1&&indexDosen2!=-1){
            // const response1 = await insertPertukaranAdmin(selectedJadwalDosen1,selectedJadwalDosen2,session.semester);
            const response2 = await tukarJadwal(selectedJadwalDosen1,jadwalDosen1[indexDosen1].idDosen,selectedJadwalDosen2,jadwalDosen2[indexDosen2].idDosen,session.semester,true);
            if(true&&response2){
                openToast();
                closeModal();
                setSelectedJadwalDosen1("");
                setSelectedJadwalDosen2("");
            }
            else{
                alert("gagal membuat pertukaran"); 
            }
        }
        else{
            alert("gagal membuat pertukaran");
        }
    }

    const onChangeSemester = async (e) => {
        const jadwalDosen1Temp = await getAllJadwal(e.target.value,selectedTipe.value);
        const jadwalDosen2Temp = await getAllJadwal(e.target.value,selectedTipe.value);
        const date = await getDatesBySemester(e.target.value,selectedTipe);

        setDates(date);
        if(date.length!=0){
            setSelectedDateDosen1(date[0].date.toISOString());
            setSelectedDateDosen2(date[0].date.toISOString());
        }
        setSelectedSemester(e.target.value);
        setJadwalDosen1(jadwalDosen1Temp);
        setJadwalDosen2(jadwalDosen2Temp);
    }

    const onChangeTipe = async (e) => {
        const jadwalDosen1Temp = await getAllJadwal(selectedSemester,e.target.value);
        const jadwalDosen2Temp = await getAllJadwal(selectedSemester,e.target.value);
        const date = await getDatesBySemester(selectedSemester,e.target.value);

        setDates(date);
        if(date.length!=0){
            setSelectedDateDosen1(date[0].date.toISOString());
            setSelectedDateDosen2(date[0].date.toISOString());
        }
        setSelectedTipe(e.target.value);
        setJadwalDosen1(jadwalDosen1Temp);
        setJadwalDosen2(jadwalDosen2Temp);
    }


    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h3 className="mx-1"><strong>Buat Pertukaran</strong></h3>
                <div className="d-flex flex-row">
                    <div className="px-1">
                        <FormSelect onChange={onChangeSemester} style={{border:"2px solid black"}}>
                            {semester.map((sem)=>(
                                sem.id==selectedSemester ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div>
                        <FormSelect onChange={onChangeTipe} style={{border:"2px solid black"}}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                            <option value="Pendek">Pendek</option>
                        </FormSelect>
                    </div>
                </div>
                <div className="mx-1">
                    <div className="d-flex flex-row my-1">
                        <Card className="px-2" style={{border:"2px solid black"}}>
                            <Row className="align-items-center">
                                <Col md="auto">
                                    <h6 className="my-2">Dosen 1:</h6>
                                </Col>
                                {jadwalDosen1.map((jadwal)=>(
                                    selectedJadwalDosen1 == jadwal.id ?
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
                    <div className="d-flex flex-row my-1">
                        <Card className="px-2" style={{border:"2px solid black"}}>
                            <Row className="align-items-center">
                                    <Col md="auto">
                                        <h6 className="my-2">Dosen 2:</h6>
                                    </Col>
                                    {jadwalDosen2.map((jadwal)=>(
                                        selectedJadwalDosen2 == jadwal.id ?
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
                <button className="btn my-1 mx-1" onClick={openModal} style={{backgroundColor:"#272829", color:"white"}}>Buat Pertukaran</button>
                <div className="mx-1">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="jadwalsaya" title="Jadwal Dosen1">
                            <ItemJadwalDosenAdmin selectedJadwalDosenLain={selectedJadwalDosen1} setSelectedJadwalDosenLain={setSelectedJadwalDosen1} dates={dates} jadwaldosenlain={jadwalDosen1} selectedDate={selectedDateDosen1} setSelectedDate={setSelectedDateDosen1}/>
                        </Tab>
                        <Tab eventKey="jadwaldosenlain" title="Jadwal Dosen2">
                            <ItemJadwalDosenAdmin selectedJadwalDosenLain={selectedJadwalDosen2} setSelectedJadwalDosenLain={setSelectedJadwalDosen2} dates={dates} jadwaldosenlain={jadwalDosen2} selectedDate={selectedDateDosen2} setSelectedDate={setSelectedDateDosen2}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <MakePertukaranAdminModal modal={modal} closeModal={closeModal} onActionWithKonsumsi={buatPertukaranTukarKonsumsi} onActionWithoutKonsumsi={buatPertukaranTidakTukarKonsumsi}/>
            <ModalCannotMakePertukaran modal={modalFailed} closeModal={closeModalFailed}/>
            <ModalCannotMakePertukaranSameId modal={modalFailedSameId} closeModal={closeModalFailedSameId}/>
            <ToastSuccessMakePertukaranAdmin toast={toast} closeToast={closeToast}/>
        </>    
    )
}