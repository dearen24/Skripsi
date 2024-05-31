"use client"
import { getDatesBySemester } from "@/app/actions/ujian";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, FormSelect, Row, Table } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

const ItemGantiJadwal = (props) => {

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
            <h3><strong>Pilih jadwal Anda yang ingin ganti</strong></h3>
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
    )
}

export default ItemGantiJadwal;