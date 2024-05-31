"use client"
import { getDatesBySemester } from "@/app/actions/ujian";
import { useEffect, useState } from "react";
import { Card, CardBody, Col, FormSelect, Row, Table } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

const ItemGantiDosen = (props) => {
    const [search, setSearch] = useState("");

    const setSelected = (e) => {
        props.setSelectedDosen(e.target.parentElement.id);
    }

    const clearSelection = () => {
        props.setSelectedDosen("");
    }

    const changeSearch = (e) => {
        setSearch(e.target.value.toString());
    }

    return(
        <>
            <h3><strong>Pilih dosen Anda yang akan menggantikan</strong></h3>
            <button className="btn my-1" onClick={clearSelection} style={{backgroundColor:"#272829", color:"white"}}>Clear Selection</button>
            <input className="form-control w-25 mb-1" placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
            <div>
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Nama</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {props.dosen.map((d)=>(
                    d.nama.toLowerCase().includes(search.toLowerCase()) ?
                    props.selectedDosen == d.id?
                    <Card className="my-1" onClick={setSelected} id={d.id} style={{borderRadius:"10px",border:"2px solid black", backgroundColor:"#83F28F"}}>
                        <CardBody id={d.id}>
                            <Row className="text-center" id={d.id}>
                                <Col className="align-content-center" id={d.id}>{d.nama}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    :
                    <Card className="my-1" onClick={setSelected} id={d.id} style={{borderRadius:"10px",border:"2px solid black"}}>
                        <CardBody id={d.id}>
                            <Row className="text-center" id={d.id}>
                                <Col className="align-content-center" id={d.id}>{d.nama}</Col>
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

export default ItemGantiDosen;