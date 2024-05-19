"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemRuangan = (ruangan) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{ruangan.class.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ruangan.class.kapasitas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                            <EditButton page={"Ruangan"} idRuangan={ruangan.class.id}/>
                            <DeleteButton page={"Ruangan"} idRuangan={ruangan.class.id} ruangan={ruangan.ruangan} setRuangan={ruangan.setRuangan}/>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )

    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{ruangan.class.nama}</td>
    //             <td className="text-center">{ruangan.class.kapasitas}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Ruangan"} idRuangan={ruangan.class.id}/>
    //                     <DeleteButton page={"Ruangan"} idRuangan={ruangan.class.id} ruangan={ruangan.ruangan} setRuangan={ruangan.setRuangan}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemRuangan;