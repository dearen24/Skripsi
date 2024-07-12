"use client"
import { useState, useEffect } from "react";
import { getAllJadwal, insertPertukaran, tukarJadwal} from "../../actions/tukarjadwal";
import { Card, Col, FormSelect, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import {gantiJadwal} from "@/app/actions/gantijadwal"
import LoadingPage from "../LoadingPage";
import { getDatesBySemester } from "@/app/actions/ujian";
import { getUser } from "@/app/actions/user";
import ItemGantiDosen from "./ItemGantiDosen";
import ItemGantiJadwal from "./ItemGantiJadwal";
import ToastSuccessMakePergantianAdmin from "../toast/SuccessMakePergantianAdmin";
import ModalCannotMakePertukaranSameDosen from "../modal/CannotMakePertukaranSameDosen";
import MakePergantianAdminModal from "../modal/MakePergantianConfirmationAdmin";
import { useRouter } from "next/navigation";
import ModalGantiJadwalColission from "../modal/GantiJadwalCollision";

export default function MainGantiJadwal({props}){
    const [isLoading,setLoading] = useState(true);
    const [jadwalDosen1, setJadwalDosen1] = useState();
    const [dosen, setDosen] = useState();
    const [selectedJadwalDosen1, setSelectedJadwalDosen1] = useState("");
    const [selectedDosen, setSelectedDosen] = useState("");
    const [key,setKey] = useState('jadwalsaya');
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester,setSemester] = useState();
    const [selectedSemester,setSelectedSemester] = useState(props.semester.id);
    const [selectedTipe,setSelectedTipe] = useState("UTS");
    const [modal, setModal] = useState(false);
    const [modalFailed, setModalFailed] = useState(false);
    const [modalBentrok, setModalBentrok] = useState(false);
    const [toast,setToast] = useState(false);
    const [dates,setDates] = useState(new Object);
    const [selectedDateDosen1,setSelectedDateDosen1] = useState("");
    const router = useRouter();

    const openModal = () => {
        const index = jadwalDosen1.findIndex(a=>a.idDosen==selectedDosen&&a.id==selectedJadwalDosen1);
        if(index!=-1){
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
    const openModalBentrok = () => setModalBentrok(true);
    const closeModalBentrok = () => setModalBentrok(false);


    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const jadwalDosen1 = await getAllJadwal(selectedSemester,selectedTipe);
            const semester = await getSemester();
            const dosen = await getUser();
            const date = await getDatesBySemester(session.semester,selectedTipe);  

            setDates(date);
            setSelectedDateDosen1(date[0].date.toISOString());
            setSemester(semester);
            setJadwalDosen1(jadwalDosen1);
            setDosen(dosen);
            setLoading(false);
        };
        fetchData();
    }, []);

    const buatPergantian = async () => {
        const index = jadwalDosen1.findIndex(a=>a.id==selectedJadwalDosen1);
        if(index!=-1){
            let bentrok = false;
            for(let i = 0;i<jadwalDosen1.length;i++){
                if(jadwalDosen1[i].idDosen==selectedDosen&&jadwalDosen1[i].ujian.date.toISOString()==jadwalDosen1[index].ujian.date.toISOString()){
                    const mulaiJadwal = new Date(jadwalDosen1[index].ujian.mulai).toTimeString().substring(0,5);
                    const selesaiJadwal = new Date(jadwalDosen1[index].ujian.selesai).toTimeString().substring(0,5);
                    const mulaiDosen = new Date(jadwalDosen1[i].ujian.mulai).toTimeString().substring(0,5);
                    const selesaiDosen = new Date(jadwalDosen1[i].ujian.selesai).toTimeString().substring(0,5);
                    if(mulaiJadwal==mulaiDosen){
                        bentrok = true;
                        break;
                    }
                    if((mulaiJadwal>mulaiDosen&&mulaiJadwal<selesaiDosen)||(mulaiDosen>mulaiJadwal&&mulaiDosen<selesaiJadwal)){//klo mulainya ditengah tengah
                        bentrok = true;
                        break;
                    }
                    if((selesaiJadwal>mulaiDosen&&selesaiJadwal<selesaiDosen)||(selesaiDosen>mulaiJadwal&&selesaiDosen<selesaiJadwal)){//klo selesainya ditengah tengah
                        bentrok = true;
                        break;
                    }
                }
            }
            if(bentrok==false){
                const response = await gantiJadwal(selectedJadwalDosen1,jadwalDosen1[index].idDosen,selectedDosen,selectedSemester);
                if(response){
                    closeModal()
                    router.refresh()
                    openToast();
                    setSelectedJadwalDosen1("");
                    setSelectedDosen("");
                }
                else{
                    alert("gagal membuat pertukaran");
                }
            }
            else{
                closeModal();
                openModalBentrok();
            }
        }
        else{
            alert("gagal membuat pertukaran");
        }
    }

    const onChangeSemester = async (e) => {
        const jadwalDosen1Temp = await getAllJadwal(e.target.value,selectedTipe.value);
        const date = await getDatesBySemester(e.target.value,selectedTipe);

        setDates(date);
        if(date.length!=0){
            setSelectedDateDosen1(date[0].date.toISOString());
        }
        setSelectedSemester(e.target.value);
        setJadwalDosen1(jadwalDosen1Temp);
    }

    const onChangeTipe = async (e) => {
        const jadwalDosen1Temp = await getAllJadwal(selectedSemester,e.target.value);
        const date = await getDatesBySemester(selectedSemester,e.target.value);

        setDates(date);
        if(date.length!=0){
            setSelectedDateDosen1(date[0].date.toISOString());
        }
        setSelectedTipe(e.target.value);
        setJadwalDosen1(jadwalDosen1Temp);
    }


    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h3 className="mx-1"><strong>Buat Pergantian</strong></h3>
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
                                    <h6 className="my-2">Jadwal:</h6>
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
                                        <h6 className="my-2">Pengawas Menggantikan:</h6>
                                    </Col>
                                    {dosen.map((d)=>(
                                        selectedDosen == d.id ?
                                        <>
                                        <Col md="auto">
                                            <h6 className="my-2">{d.nama}</h6>
                                        </Col>
                                        </>
                                        :
                                        null
                                    ))}
                            </Row>
                        </Card>
                    </div>
                </div>
                <button className="btn my-1 mx-1" onClick={openModal} style={{backgroundColor:"#272829", color:"white"}}>Buat Pergantian</button>
                <div className="mx-1">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="jadwalsaya" title="Jadwal Dosen">
                            <ItemGantiJadwal selectedJadwalDosenLain={selectedJadwalDosen1} setSelectedJadwalDosenLain={setSelectedJadwalDosen1} dates={dates} jadwaldosenlain={jadwalDosen1} selectedDate={selectedDateDosen1} setSelectedDate={setSelectedDateDosen1}/>
                        </Tab>
                        <Tab eventKey="jadwaldosenlain" title="Dosen Menggantikan">
                            <ItemGantiDosen selectedDosen={selectedDosen} setSelectedDosen={setSelectedDosen} dosen={dosen}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <MakePergantianAdminModal modal={modal} closeModal={closeModal} onAction={buatPergantian}/>
            {/* <ModalCannotMakePertukaran modal={modalFailed} closeModal={closeModalFailed}/> */}
            <ModalCannotMakePertukaranSameDosen modal={modalFailed} closeModal={closeModalFailed}/>
            <ToastSuccessMakePergantianAdmin toast={toast} closeToast={closeToast}/>
            <ModalGantiJadwalColission modal={modalBentrok} closeModal={closeModalBentrok}/>
        </>    
    )
}