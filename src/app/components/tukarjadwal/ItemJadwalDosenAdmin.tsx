"use client"
import { getDatesBySemester } from "@/app/actions/ujian";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, FormSelect, Row, Table } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

const ItemJadwalDosenAdmin = (props) => {

    const setSelected = (e) => {
        props.setSelectedJadwalDosenLain(e.target.parentElement.id);
    }

    const clearSelection = (e) => {
        props.setSelectedJadwalDosenLain("");
    }

    const handleChangeDate = (e) => {
        props.setSelectedDate(e.target.value);
    }

    return(
        <>
            <h3><strong>Pilih jadwal Anda yang ingin ditukar</strong></h3>
            <button className="btn my-1" onClick={clearSelection} style={{backgroundColor:"#272829", color:"white"}}>Clear Selection</button>
            <div className="mb-1 w-25">
                <FormSelect onChange={handleChangeDate} style={{border:"2px solid black"}}>
                    {props.dates.map((date)=>(
                        date.date.toISOString()==props.selectedDate ?
                        <option value={date.date.toISOString()} selected>{date.date.toDateString().split(" ")[0]+", "+date.date.toDateString().split(" ")[2]+" "+date.date.toDateString().split(" ")[1]+" "+date.date.toDateString().split(" ")[3]}</option>
                        :
                        <option value={date.date.toISOString()}>{date.date.toDateString().split(" ")[0]+", "+date.date.toDateString().split(" ")[2]+" "+date.date.toDateString().split(" ")[1]+" "+date.date.toDateString().split(" ")[3]}</option>
                    ))}
                </FormSelect>
            </div>
            <div>
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Tanggal</strong>
                            </Col>
                            <Col>
                                <strong>Waktu Mulai</strong>
                            </Col>
                            <Col>
                                <strong>Waktu Selesai</strong>
                            </Col>
                            <Col>
                                <strong>Mata Kuliah</strong>
                            </Col>
                            <Col>
                                <strong>Ruangan</strong>
                            </Col>
                            <Col>
                                <strong>Dosen</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {props.jadwaldosenlain.map((jadwal)=>(
                    jadwal.ujian.date.toISOString()==props.selectedDate ?
                    props.selectedJadwalDosenLain == jadwal.id?
                    <Card className="my-1" onClick={setSelected} id={jadwal.id} style={{borderRadius:"10px",border:"2px solid black", backgroundColor:"#83F28F"}}>
                        <CardBody id={jadwal.id}>
                            <Row className="text-center" id={jadwal.id}>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="d-flex flex-column" id={jadwal.id}>
                                    {jadwal.ujian.matkul.map((matkul)=>(
                                        <span>{matkul.nama}</span>
                                    ))}
                                </Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ruangan.nama}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.dosen.nama}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    :
                    <Card className="my-1" onClick={setSelected} id={jadwal.id} style={{borderRadius:"10px",border:"2px solid black"}}>
                        <CardBody id={jadwal.id}>
                            <Row className="text-center" id={jadwal.id}>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="d-flex flex-column justify-content-center" id={jadwal.id}>
                                    {jadwal.ujian.matkul.map((matkul)=>(
                                        <span>{matkul.nama}</span>
                                    ))}
                                </Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ruangan.nama}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.dosen.nama}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                :
                null
                ))}
            </div>
        </>


        // <>
        //     <h6>Pilih jadwal dosen yang akan ditukar</h6>
        //     <button className="btn" onClick={clearSelection} style={{backgroundColor:"#272829", color:"white"}}>Clear Selection</button>
        //     <Table striped bordered hover>
        //         <thead>
        //             <tr>
        //                 <th>Tanggal</th>
        //                 <th>Waktu Mulai</th>
        //                 <th>Waktu Selesai</th>
        //                 <th>Mata Kuliah</th>
        //                 <th>Ruangan</th>
        //                 <th>Dosen</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {props.jadwaldosenlain.map((jadwal)=>(
        //                 props.selectedJadwalDosenLain == jadwal.id?
        //                 <tr className="" onClick={setSelected} id={jadwal.id} style={{border:"2px solid green"}}>
        //                     <td>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</td>
        //                     <td>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</td>
        //                     <td>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</td>
        //                     <td className="d-flex flex-column">
        //                         {jadwal.ujian.matkul.map((matkul)=>(
        //                             <span>{matkul.nama}</span>
        //                         ))}
        //                     </td>
        //                     <td>{jadwal.ruangan.nama}</td>
        //                     <td>{jadwal.dosen.nama}</td>
        //                 </tr>
        //                 :
        //                 <tr onClick={setSelected} id={jadwal.id}>
        //                     <td>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</td>
        //                     <td>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</td>
        //                     <td>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</td>
        //                     <td className="d-flex flex-column">
        //                         {jadwal.ujian.matkul.map((matkul)=>(
        //                             <span>{matkul.nama}</span>
        //                         ))}
        //                     </td>
        //                     <td>{jadwal.ruangan.nama}</td>
        //                     <td>{jadwal.dosen.nama}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </Table>
        // </>
    )
}

export default ItemJadwalDosenAdmin;