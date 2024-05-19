"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Row, Col } from "react-bootstrap";

const ItemDosen = (dosen) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{dosen.dosen.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{dosen.dosen.nik}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{dosen.dosen.email}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{dosen.dosen.role.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{dosen.dosen.role.kuotaMengawas}</strong>
                    </Col>
                    <Col className="align-content-center">
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

    // return(
    //     <>
    //         <tr className="table-light">
    //             <td className="text-center">{dosen.dosen.nama}</td>
    //             <td className="text-center">{dosen.dosen.nik}</td>
    //             <td className="text-center">{dosen.dosen.email}</td>                        
    //             <td className="text-center">{dosen.dosen.role.nama}</td>
    //             <td className="text-center">{dosen.dosen.role.kuotaMengawas}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Dosen"} idDosen={dosen.dosen.id}/>
    //                     {dosen.dosen.role.nama=="Admin" ?
    //                         null
    //                     :
    //                         <DeleteButton page={"Dosen"} idDosen={dosen.dosen.id} pengguna={dosen.pengguna} setPengguna={dosen.setPengguna}/>
    //                     }
    //                 </div>
    //             </td>
    //         </tr>
    //     </>
    // )
}

export default ItemDosen;