"use client"
import Image from "next/image";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";

const ItemPengajuanSaya = (props) => {
    console.log(props);
    return(
        <>
            <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
                <CardBody>
                    <Row>
                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
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
                                    <span>: {props.item.Dosen1.dosen.nama}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    // <Row className="text-end">
                    //     <div className="d-flex flex-row align-items-center">
                    //         <div className="d-flex flex-column w-100 align-items-start">
                    //             <span>Tanggal</span>
                    //             <span>Waktu Mulai</span>
                    //             <span>Waktu Selesai</span>
                    //         </div>
                    //         <div className="d-flex flex-column w-100 align-items-start">
                    //             <span>: {props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</span>
                    //             <span>: {props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</span>
                    //             <span>: {props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
                    //         </div>
                    //         <div className="d-flex flex-column w-100 align-items-start">
                    //             <span>Mata Kuliah</span>
                    //             <span>Ruangan</span>
                    //             <span>Dosen</span>
                    //         </div>
                    //         <div className="d-flex flex-column w-100 align-items-start">
                    //             <div className="d-flex flex-row align-items-center">
                    //                 <div className="d-flex flex-column w-100 justify-content-center">
                    //                     {props.item.Dosen2.ujian.matkul.map((item)=>(
                    //                         <span>: {item.nama}</span>
                    //                     ))}
                    //                 </div>
                    //             </div>
                    //             <span>: {props.item.Dosen2.ruangan.nama}</span>
                    //             <span>: {props.item.Dosen1.dosen.nama}</span>
                    //         </div>
                    //     </div>
                    // </Row>
                    :
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
                                    <span>: {props.item.Dosen1.dosen.nama}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>                   
                    }
                    <Col xs="1" className="align-content-center" style={{textAlign:"center"}}>
                        <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>
                    </Col>
                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
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
                                    <span>: {props.item.Dosen2.dosen.nama}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    :
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
                                    <span>: {props.item.Dosen2.dosen.nama}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    }
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
                                        {props.item.pertukaran.statusAdmin.toString()=="Belum Disetujui" ? <>: <Row><Badge pill bg="warning"> Belum Disetujui</Badge></Row></> : null}
                                        {props.item.pertukaran.statusAdmin.toString()=="Disetujui" ? <>: <Row><Badge pill bg="success">Disetujui</Badge></Row></> : null}
                                        {props.item.pertukaran.statusAdmin.toString()=="Ditolak" ? <>: <Row><Badge pill bg="danger">Ditolak</Badge></Row></> : null}
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
                    <Col className="text-center align-content-center">
                        {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? 
                            <DeleteButton page={"Pertukaran Jadwal"} idPertukaran1={props.item.Dosen1.id} idPertukaran2={props.item.Dosen2.id} pertukaran={props.pertukaran} setPertukaran={props.setPertukaran}/>
                        :
                            null
                        }
                    </Col>
                    </Row>
                </CardBody>
            </Card> 
        </>
    )
}

export default ItemPengajuanSaya;