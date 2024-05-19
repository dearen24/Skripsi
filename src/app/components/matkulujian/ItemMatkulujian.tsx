"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemMatkulUjian = (matkulujian) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{matkulujian.matkulujian.matkul.nama}</strong>
                    </Col>
                    <Col className="align-content-center">
                        {matkulujian.matkulujian.dosenPengajar.map((dosen)=>(
                            <div><strong>{dosen.nama}</strong></div>    
                    ))}
                    </Col>
                    <Col className="align-content-center">
                        <strong>{matkulujian.matkulujian.peserta}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                            <EditButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id}/>
                            <DeleteButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id} matkulujian={matkulujian.allmatkulujian} setMatkulujian={matkulujian.setMatkulujian}/>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
    
    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{matkulujian.matkulujian.semester.semester}</td>
    //             <td className="text-center">{matkulujian.matkulujian.matkul.nama}</td>
    //             <td className="text-center">
    //                 {matkulujian.matkulujian.dosenPengajar.map((dosen)=>(
    //                     <div><a>{dosen.nama}</a></div>    
    //                 ))}
    //             </td>                        
    //             <td className="text-center">{matkulujian.matkulujian.peserta}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id}/>
    //                     <DeleteButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id} matkulujian={matkulujian.allmatkulujian} setMatkulujian={matkulujian.setMatkulujian}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemMatkulUjian;