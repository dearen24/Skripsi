"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemJabatan = (jabatan) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"3px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{jabatan.role.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{jabatan.role.kuotaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
                        {jabatan.role.nama=="Admin" ? 
                            null
                        :
                            <div className="d-flex flex-row justify-content-center">
                                <EditButton page={"Jabatan"} idJabatan={jabatan.role.id}/>
                                <DeleteButton page={"Jabatan"} idJabatan={jabatan.role.id} jabatan={jabatan.jabatan} setJabatan={jabatan.setJabatan}/>
                            </div>
                        }
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )

    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center" id="idJabatan" hidden>{jabatan.role.id}</td>
    //             <td className="text-center">{jabatan.role.nama}</td>
    //             <td className="text-center">{jabatan.role.kuotaMengawas}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Jabatan"} idJabatan={jabatan.role.id}/>
    //                     <DeleteButton page={"Jabatan"} idJabatan={jabatan.role.id} jabatan={jabatan.jabatan} setJabatan={jabatan.setJabatan}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemJabatan;