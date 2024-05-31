"use client"
import { getDatesBySemester } from "@/app/actions/ujian";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, FormSelect, Row, Table } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

const ItemListGantiJadwal = (props) => {
    return(
        <>
            <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
                <CardBody>
                    <Row className="text-center">
                        <Col>
                            <Row className="justify-content-center">
                                {props.pergantian.ujian.date.toDateString().split(" ")[0]+", "+props.pergantian.ujian.date.toDateString().split(" ")[2]+" "+props.pergantian.ujian.date.toDateString().split(" ")[1]+" "+props.pergantian.ujian.date.toDateString().split(" ")[3]}
                            </Row>
                            <Row className="justify-content-center">
                                {props.pergantian.ujian.mulai.toString().split(" ")[4].substring(0,5)+" - "+props.pergantian.ujian.selesai.toString().split(" ")[4].substring(0,5)}
                            </Row>
                            <Row className="justify-content-center">
                                {props.pergantian.ruangan.nama}
                            </Row>
                            {props.pergantian.ujian.matkul.map((matkul)=>(
                                <Row className="justify-content-center">
                                    {matkul.nama}
                                </Row>
                            ))}
                        </Col>
                        <Col className="align-content-center">{props.pergantian.dosenDigantikan}</Col>
                        <Col className="align-content-center">{props.pergantian.dosen.nama}</Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}

export default ItemListGantiJadwal;