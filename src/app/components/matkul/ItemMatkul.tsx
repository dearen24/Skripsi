"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";

const ItemMatkul = (matakuliah) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{matakuliah.matakuliah.kode}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{matakuliah.matakuliah.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                         <EditButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id}/>
                         <DeleteButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id} matkul={matakuliah.matkul} setMatkul={matakuliah.setMatkul}/>
                     </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
    
    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{matakuliah.matakuliah.kode}</td>
    //             <td className="text-center">{matakuliah.matakuliah.nama}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id}/>
    //                     <DeleteButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id} matkul={matakuliah.matkul} setMatkul={matakuliah.setMatkul}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemMatkul;