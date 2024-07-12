"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemUjian = (ujian) => {
    const date = String(ujian.ujian.date).split(" ");
    const mulai = String(ujian.ujian.mulai).split(" ")[4].substring(0,5);
    const selesai = String(ujian.ujian.selesai).split(" ")[4].substring(0,5);
    
    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{mulai}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{selesai}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.metode}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.tipe}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.shift}</strong>
                    </Col>
                    <Col className="align-content-center">
                        {ujian.ujian.matkul.map((matkul)=>(
                            <div><strong>{matkul.nama}</strong></div>    
                        ))}
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                         <EditButton page={"Ujian"} idUjian={ujian.ujian.id}/>
                         <DeleteButton page={"Ujian"} idUjian={ujian.ujian.id} ujian={ujian.allUjian} setUjian={ujian.setUjian}/>
                      </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ItemUjian;