"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";

const ItemRekapMengawas = (rekap) => {
    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.kuotaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.jumlahMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.sisaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.kuotaSelanjutnya}</strong>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ItemRekapMengawas;