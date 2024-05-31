"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Row, Col } from "react-bootstrap";

const ItemDosen = (dosen) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center" md="2">
                        <strong>{dosen.dosen.nama}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
                        <strong>{dosen.dosen.nik}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
                        <strong>{dosen.dosen.email}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
                        <strong>{dosen.dosen.role.nama}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
                        <strong>{dosen.dosen.role.kuotaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
                        <div className="d-flex flex-row justify-content-center">
                            <EditButton page={"Dosen"} idDosen={dosen.dosen.id}/>
                            {dosen.dosen.role.nama=="Admin" ?
                                null
                            :
                                <DeleteButton page={"Dosen"} idDosen={dosen.dosen.id} pengguna={dosen.pengguna} setPengguna={dosen.setPengguna}/>
                            }
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ItemDosen;