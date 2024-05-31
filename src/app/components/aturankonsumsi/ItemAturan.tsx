"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Button, Card, CardBody, Col, Row } from "react-bootstrap";
import Image from "next/image";

const ItemAturan = (aturan) => {

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        {aturan.rule.delapanSepuluh.toString()=="true"?
                            <Button className="btn btn-sm btn-success" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/check-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        :
                            <Button className="btn btn-sm btn-danger" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/x-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        }
                    </Col>
                    <Col className="align-content-center">
                        {aturan.rule.sepuluhDuaBelas.toString()=="true"?
                            <Button className="btn btn-sm btn-success" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/check-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        :
                            <Button className="btn btn-sm btn-danger" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/x-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        }
                    </Col>
                    <Col className="align-content-center">
                        {aturan.rule.sebelasTigaBelas.toString()=="true"?
                            <Button className="btn btn-sm btn-success" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/check-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        :
                            <Button className="btn btn-sm btn-danger" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/x-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        }
                    </Col>
                    <Col className="align-content-center">
                        {aturan.rule.duaBelasDua.toString()=="true"?
                            <Button className="btn btn-sm btn-success" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/check-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        :
                            <Button className="btn btn-sm btn-danger" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/x-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        }
                    </Col>
                    <Col className="align-content-center">
                        {aturan.rule.duaEmpat.toString()=="true"?
                            <Button className="btn btn-sm btn-success" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/check-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        :
                            <Button className="btn btn-sm btn-danger" style={{border:"2px solid black", borderRadius:"50px"}}>
                                <Image src="/x-circle-fill.svg" alt="True" height={20} width={20}/>
                            </Button>
                        }
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.snack.toString()}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{aturan.rule.lunch.toString()}</strong>
                    </Col>
                    <Col className="align-content-center" md="2">
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