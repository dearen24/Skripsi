"use client"
import Image from "next/image";
import { AcceptButton } from "../buttons/AcceptButton";
import { RejectButton } from "../buttons/RejectButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";
import { acceptPertukaran, acceptPertukaranAdmin, rejectPertukaran, rejectPertukaranAdmin, tukarJadwal } from "@/app/actions/tukarjadwal";
import { useState } from "react";
import AcceptPertukaranModal from "../modal/AcceptPertukaranConfirmation";
import ToastSuccessAcceptPertukaran from "../toast/SuccessAcceptPertukaran";
import RejectPertukaranModal from "../modal/RejectPertukaranConfirmation";
import ToastSuccessRejectPertukaran from "../toast/SuccessRejectPertukaran";

const ItemPertukaranDosenAdmin = (props) => {
    const [statusAdmin,setStatusAdmin] = useState(props.item.pertukaran.statusAdmin);
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
        const status = await acceptPertukaranAdmin(props.item.Dosen1.id,props.item.Dosen2.id);
        const response = await tukarJadwal(props.item.Dosen1.id,props.item.Dosen1.idDosen,props.item.Dosen2.id,props.item.Dosen2.idDosen);
        if(response&&status){
            setStatusAdmin("Disetujui");
            closeModalAccept();
            openToastAccept();
        }
    }

    const onRejectPertukaran = async () => {
        const response = await rejectPertukaranAdmin(props.item.Dosen1.id,props.item.Dosen2.id);
        if(response==true){
            setStatusAdmin("Ditolak");
            closeModalReject();
            openToastReject();
        }
    }

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-end">
                    <Col>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-end">
                                    <span>Tanggal</span>
                                    <span>Waktu</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-start">
                                    <span>: {props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</span>
                                    <span>: {props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-end">
                                    <span>Mata Kuliah</span>
                                    <span>Ruangan</span>
                                    <span>Dosen</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-start text-start">
                                    <div className="d-flex flex-row align-items-start">
                                        <div className="d-flex flex-column w-100 align-items-start">
                                            {props.item.Dosen1.ujian.matkul.map((item)=>(
                                                <span>: {item.nama}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span>: {props.item.Dosen1.ruangan.nama}</span>
                                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui" ?
                                        <span>: {props.item.Dosen2.dosen.nama}</span>
                                    :
                                        <span>: {props.item.Dosen1.dosen.nama}</span>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="1" className="align-content-center" style={{textAlign:"center"}}>
                        <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>   
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-end">
                                    <span>Tanggal</span>
                                    <span>Waktu</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-start">
                                    <span>: {props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</span>
                                    <span>: {props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-end">
                                    <span>Mata Kuliah</span>
                                    <span>Ruangan</span>
                                    <span>Dosen</span>
                                </div>
                            </Col>
                            <Col>
                                <div className="d-flex flex-column w-100 align-items-start text-start">
                                    <div className="d-flex flex-row align-items-start">
                                        <div className="d-flex flex-column w-100 align-items-start">
                                            {props.item.Dosen2.ujian.matkul.map((item)=>(
                                                <span>: {item.nama}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <span>: {props.item.Dosen2.ruangan.nama}</span>
                                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui" ?
                                        <span>: {props.item.Dosen1.dosen.nama}</span>
                                    :
                                        <span>: {props.item.Dosen2.dosen.nama}</span>
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="align-content-center">
                        <Row>
                            <Col className="text-end">
                                <Col>
                                    <Row className="justify-content-end my-1">Admin</Row>
                                    <Row className="justify-content-end my-1">Dosen</Row>
                                </Col>
                            </Col>
                            <Col>
                                <Col> 
                                    <Row className="my-1">
                                        {statusAdmin.toString()=="Belum Disetujui" ? <>: <Row><Badge pill bg="warning"> Belum Disetujui</Badge></Row></> : null}
                                        {statusAdmin.toString()=="Disetujui" ? <>: <Row><Badge pill bg="success">Disetujui</Badge></Row></> : null}
                                        {statusAdmin.toString()=="Ditolak" ? <>: <Row><Badge pill bg="danger">Ditolak</Badge></Row></> : null}
                                    </Row>
                                </Col>
                                <Col>
                                    <Row className="my-1">
                                        {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? <>: <Row><Badge pill bg="warning">Belum Disetujui</Badge></Row></> : null}
                                        {props.item.pertukaran.statusDosen2.toString()=="Disetujui" ? <>: <Row><Badge pill bg="success">Disetujui</Badge></Row></> : null}
                                        {props.item.pertukaran.statusDosen2.toString()=="Ditolak" ? <>: <Row><Badge pill bg="danger">Ditolak</Badge></Row></> : null}
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="align-content-center">
                    {statusAdmin.toString()=="Belum Disetujui" ? 
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

    // return(
    //     <>
    //         <tbody>
    //             <tr>
    //                 <td className="text-center">
    //                     <div className="d-flex flex-row align-items-center">
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>Tanggal</span>
    //                             <span>Waktu Mulai</span>
    //                             <span>Waktu Selesai</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>: {props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</span>
    //                             <span>: {props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</span>
    //                             <span>: {props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>Mata Kuliah</span>
    //                             <span>Ruangan</span>
    //                             <span>Dosen</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <div className="d-flex flex-row align-items-center">
    //                                 <div className="d-flex flex-column w-100 justify-content-center">
    //                                     {props.item.Dosen1.ujian.matkul.map((item)=>(
    //                                         <span>: {item.nama}</span>
    //                                     ))}
    //                                 </div>
    //                             </div>
    //                             <span>: {props.item.Dosen1.ruangan.nama}</span>
    //                             {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui" ?
    //                                 <span>: {props.item.Dosen2.dosen.nama}</span>
    //                             :
    //                                 <span>: {props.item.Dosen1.dosen.nama}</span>
    //                             }
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td>
    //                     <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>
    //                 </td>
    //                 <td className="text-center">
    //                 <div className="d-flex flex-row align-items-center">
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>Tanggal</span>
    //                             <span>Waktu Mulai</span>
    //                             <span>Waktu Selesai</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>: {props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</span>
    //                             <span>: {props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</span>
    //                             <span>: {props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <span>Mata Kuliah</span>
    //                             <span>Ruangan</span>
    //                             <span>Dosen</span>
    //                         </div>
    //                         <div className="d-flex flex-column w-100 align-items-start">
    //                             <div className="d-flex flex-row align-items-center">
    //                                 <div className="d-flex flex-column w-100 justify-content-center">
    //                                     {props.item.Dosen2.ujian.matkul.map((item)=>(
    //                                         <span>: {item.nama}</span>
    //                                     ))}
    //                                 </div>
    //                             </div>
    //                             <span>: {props.item.Dosen2.ruangan.nama}</span>
    //                             {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui" ?
    //                                 <span>: {props.item.Dosen1.dosen.nama}</span>
    //                             :
    //                                 <span>: {props.item.Dosen2.dosen.nama}</span>
    //                             }
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td className="text-center">
    //                     <div className="d-flex flex-row">
    //                         <div className="d-flex flex-column w-100">
    //                             <div className="py-1">Admin</div>
    //                             <div className="py-1">Dosen</div>
    //                         </div>
    //                         <div className="d-flex flex-column w-100">
    //                             <div className="d-flex flex-row py-1"> 
    //                                 {statusAdmin.toString()=="Belum Disetujui" ? <>: <Badge pill bg="warning"> Belum Disetujui</Badge></> : null}
    //                                 {statusAdmin.toString()=="Disetujui" ? <>: <Badge pill bg="success">Disetujui</Badge></> : null}
    //                                 {statusAdmin.toString()=="Ditolak" ? <>: <Badge pill bg="danger">Ditolak</Badge></> : null}
    //                             </div>
    //                             <div className="d-flex flex-row py-1"> 
    //                                 {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? <>: <Badge pill bg="warning">Belum Disetujui</Badge></> : null}
    //                                 {props.item.pertukaran.statusDosen2.toString()=="Disetujui" ? <>: <Badge pill bg="success">Disetujui</Badge></> : null}
    //                                 {props.item.pertukaran.statusDosen2.toString()=="Ditolak" ? <>: <Badge pill bg="danger">Ditolak</Badge></> : null}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </td>
    //                 <td className="text-center">
    //                     {statusAdmin.toString()=="Belum Disetujui" ? 
    //                         <div className="d-flex flex-row justify-content-center">
    //                             <AcceptButton onClick={openModalAccept}/>
    //                             <RejectButton onClick={openModalReject}/>
    //                         </div>
    //                     :
    //                         null
    //                     }
    //                 </td>
    //             </tr>
    //         </tbody> 

    //         <AcceptPertukaranModal modal={modalAccept} closeModal={closeModalAccept} onAction={onAcceptPertukaran}/>
    //         <RejectPertukaranModal modal={modalReject} closeModal={closeModalReject} onAction={onRejectPertukaran}/>

    //         <ToastSuccessAcceptPertukaran toast={toastAccept} closeToast={closeToastAccept}/>
    //         <ToastSuccessRejectPertukaran toast={toastReject} closeToast={closeToastReject}/>
    //     </>
    // )
}

export default ItemPertukaranDosenAdmin;