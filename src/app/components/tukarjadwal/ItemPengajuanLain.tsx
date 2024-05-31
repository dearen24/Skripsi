"use client"
import Image from "next/image";
import { AcceptButton } from "../buttons/AcceptButton";
import { RejectButton } from "../buttons/RejectButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";
import { acceptPertukaran, rejectPertukaran } from "@/app/actions/tukarjadwal";
import { useState } from "react";
import AcceptPertukaranModal from "../modal/AcceptPertukaranConfirmation";
import ToastSuccessAcceptPertukaran from "../toast/SuccessAcceptPertukaran";
import RejectPertukaranModal from "../modal/RejectPertukaranConfirmation";
import ToastSuccessRejectPertukaran from "../toast/SuccessRejectPertukaran";

const ItemPengajuanLain = (props) => {
    const [statusDosen2,setStatusDosen2] = useState(props.item.pertukaran.statusDosen2);
    const [modalAccept,setModalAccept] = useState(false);
    const [modalReject,setModalReject] = useState(false);
    const [toastAccept,setToastAccept] = useState(false);
    const [toastReject,setToastReject] = useState(false);

    const closeModalAccept = () => setModalAccept(false);
    const openModalAccept = () => setModalAccept(true);
    const closeModalReject = () => setModalReject(false);
    const openModalReject = () => setModalReject(true);
    
    const closeToastAccept = () => setToastAccept(false);
    const openToastAccept = () => setToastAccept(true);
    const closeToastReject = () => setToastReject(false);
    const openToastReject = () => setToastReject(true);

    const onAcceptPertukaran = async () => {
        const response = await acceptPertukaran(props.item.pertukaran.id);
        setStatusDosen2("Disetujui");
        closeModalAccept();
        openToastAccept();
    }

    const onRejectPertukaran = async () => {
        const response = await rejectPertukaran(props.item.pertukaran.id);
        setStatusDosen2("Ditolak");
        closeModalReject();
        openToastReject();
    }

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row>
                {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
                <Col className="align-content-center">
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    {props.item.Dosen2.ujian.matkul.map((item)=>(
                        <Row className="justify-content-center">{item.nama}</Row>
                    ))}
                    <Row className="justify-content-center">{props.item.Dosen2.ruangan.nama}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.dosen.nama}</Row>
                </Col>
                :
                <Col className="align-content-center">
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    {props.item.Dosen1.ujian.matkul.map((item)=>(
                        <Row className="justify-content-center">{item.nama}</Row>
                    ))}
                    <Row className="justify-content-center">{props.item.Dosen1.ruangan.nama}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.dosen.nama}</Row>
                </Col>                   
                }
                <Col xs="1" className="align-content-center" style={{textAlign:"center"}}>
                    <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>
                </Col>
                {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
                <Col className="align-content-center">
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    <Row className="justify-content-center">{props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    {props.item.Dosen1.ujian.matkul.map((item)=>(
                        <Row className="justify-content-center">{item.nama}</Row>
                    ))}
                    <Row className="justify-content-center">{props.item.Dosen1.ruangan.nama}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.dosen.nama}</Row>
                </Col>
                :
                <Col className="align-content-center">
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                    {props.item.Dosen2.ujian.matkul.map((item)=>(
                        <Row className="justify-content-center">{item.nama}</Row>
                    ))}
                    <Row className="justify-content-center">{props.item.Dosen2.ruangan.nama}</Row>
                    <Row className="justify-content-center">{props.item.Dosen2.dosen.nama}</Row>
                </Col>
                }
                <Col className="align-content-center">
                    <Row className="text-center my-1">
                            {props.item.pertukaran.statusAdmin.toString()=="Belum Disetujui" ? <Col>Admin: <Badge pill bg="warning" style={{border:"2px solid black", color:"black"}}> Belum Disetujui</Badge></Col> : null}
                            {props.item.pertukaran.statusAdmin.toString()=="Disetujui" ? <Col>Admin: <Badge pill bg="success" style={{border:"2px solid black", color:"black"}}>Disetujui</Badge></Col> : null}
                            {props.item.pertukaran.statusAdmin.toString()=="Ditolak" ? <Col>Admin: <Badge pill bg="danger" style={{border:"2px solid black", color:"black"}}>Ditolak</Badge></Col> : null}
                    </Row>
                    <Row className="text-center my-1">
                            {statusDosen2.toString()=="Belum Disetujui" ? <Col>Dosen: <Badge pill bg="warning" style={{border:"2px solid black", color:"black"}}> Belum Disetujui</Badge></Col> : null}
                            {statusDosen2.toString()=="Disetujui" ? <Col>Dosen: <Badge pill bg="success" style={{border:"2px solid black", color:"black"}}>Disetujui</Badge></Col> : null}
                            {statusDosen2.toString()=="Ditolak" ? <Col>Dosen: <Badge pill bg="danger" style={{border:"2px solid black", color:"black"}}>Ditolak</Badge></Col> : null}
                    </Row>
                </Col>
                <Col className="align-content-center">
                {statusDosen2.toString()=="Belum Disetujui" ? 
                    <Row className="d-flex flex-row justify-content-center">
                        <AcceptButton onClick={openModalAccept}/>
                        <RejectButton onClick={openModalReject}/>
                    </Row>
                :
                    null
                }
                </Col>
                </Row>
            </CardBody>
            <AcceptPertukaranModal modal={modalAccept} closeModal={closeModalAccept} onAction={onAcceptPertukaran}/>
            <RejectPertukaranModal modal={modalReject} closeModal={closeModalReject} onAction={onRejectPertukaran}/>

            <ToastSuccessAcceptPertukaran toast={toastAccept} closeToast={closeToastAccept}/>
            <ToastSuccessRejectPertukaran toast={toastReject} closeToast={closeToastReject}/>
        </Card> 

    )
}

export default ItemPengajuanLain;