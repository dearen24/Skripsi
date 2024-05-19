"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemAturan = (aturan) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{aturan.index}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.delapanSepuluh.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.sepuluhDuaBelas.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.sebelasTigaBelas.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.duaBelasDua.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.duaEmpat.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.snack.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.lunch.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                            <EditButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id}/>
                            <DeleteButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id} aturan={aturan.aturan} setAturan={aturan.setAturan}/>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
    
    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{aturan.index}</td>
    //             <td className="text-center">{aturan.rule.sebelum12.toString()}</td>
    //             <td className="text-center">{aturan.rule.melewati12.toString()}</td>
    //             <td className="text-center">{aturan.rule.setelah12.toString()}</td>
    //             <td className="text-center">{aturan.rule.konsumsi.toString()}</td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id}/>
    //                     <DeleteButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id} aturan={aturan.aturan} setAturan={aturan.setAturan}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemAturan;