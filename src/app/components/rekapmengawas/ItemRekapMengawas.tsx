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
                        <strong>{rekap.rekap.role.kuotaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.countMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{rekap.rekap.nextKuota}</strong>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )

    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{rekap.rekap.nama}</td>
    //             <td className="text-center">{rekap.rekap._count.idDosen}</td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemRekapMengawas;