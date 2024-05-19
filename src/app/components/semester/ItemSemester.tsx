"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";

const ItemSemester = (semester) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{semester.sem.semester}</strong>
                    </Col>
                    <Col className="align-content-center">
                        {semester.sem.status==false ? <Badge pill bg="danger">Tidak Aktif</Badge> : <Badge pill bg="success">Aktif</Badge>}
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                            <EditButton page={"Semester"} idSemester={semester.sem.id}/>
                            <DeleteButton page={"Semester"} idSemester={semester.sem.id} semester={semester.semester} setSemester={semester.setSemester}/>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )

    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{semester.sem.semester}</td>
    //             {semester.sem.status==false ? <td className="text-center"><Badge pill bg="danger">Tidak Aktif</Badge></td> : <td className="text-center"><Badge pill bg="success">Aktif</Badge></td>}
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Semester"} idSemester={semester.sem.id}/>
    //                     <DeleteButton page={"Semester"} idSemester={semester.sem.id} semester={semester.semester} setSemester={semester.setSemester}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemSemester;