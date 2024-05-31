"use client"
import Image from "next/image";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge, Card, CardBody, Col, Row } from "react-bootstrap";

const ItemPengajuanSaya = (props) => {
    return(
        <>
            <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
                <CardBody>
                    <Row>
                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
                    <Col className="align-content-center">
                        <Row className="justify-content-center">{props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</Row>
                        <Row className="justify-content-center">{props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                        {props.item.Dosen2.ujian.matkul.map((item)=>(
                            <Row className="justify-content-center">{item.nama}</Row>
                        ))}
                        <Row className="justify-content-center">{props.item.Dosen2.ruangan.nama}</Row>
                        <Row className="justify-content-center">{props.item.Dosen1.dosen.nama}</Row>
                    </Col>
                    :
                    <Col className="align-content-center">
                        <Row className="justify-content-center">{props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</Row>
                        <Row className="justify-content-center">{props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                        {props.item.Dosen1.ujian.matkul.map((item)=>(
                            <Row className="justify-content-center">{item.nama}</Row>
                        ))}
                        <Row className="justify-content-center">{props.item.Dosen1.ruangan.nama}</Row>
                        <Row className="justify-content-center">{props.item.Dosen1.dosen.nama}</Row>
                    </Col>                   
                    }
                    <Col xs="1" className="align-content-center" style={{textAlign:"center"}}>
                        <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>
                    </Col>
                    {props.item.pertukaran.statusDosen2=="Disetujui"&&props.item.pertukaran.statusAdmin=="Disetujui"?
                    <Col>
                        <Row className="justify-content-center">{props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</Row>
                        <Row className="justify-content-center">{props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                        {props.item.Dosen1.ujian.matkul.map((item)=>(
                            <Row className="justify-content-center">{item.nama}</Row>
                        ))}
                        <Row className="justify-content-center">{props.item.Dosen1.ruangan.nama}</Row>
                        <Row className="justify-content-center">{props.item.Dosen2.dosen.nama}</Row>
                    </Col>
                    :
                    <Col>
                        <Row className="justify-content-center">{props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</Row>
                        <Row className="justify-content-center">{props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Row>
                        {props.item.Dosen2.ujian.matkul.map((item)=>(
                            <Row className="justify-content-center">{item.nama}</Row>
                        ))}
                        <Row className="justify-content-center">{props.item.Dosen2.ruangan.nama}</Row>
                        <Row className="justify-content-center">{props.item.Dosen2.dosen.nama}</Row>
                    </Col>
                    }
                    <Col className="align-content-center">
                        <Row className="text-center my-1">
                                {props.item.pertukaran.statusAdmin.toString()=="Belum Disetujui" ? <Col>Admin: <Badge pill bg="warning" style={{border:"2px solid black", color:"black"}}> Belum Disetujui</Badge></Col> : null}
                                {props.item.pertukaran.statusAdmin.toString()=="Disetujui" ? <Col>Admin: <Badge pill bg="success" style={{border:"2px solid black", color:"black"}}>Disetujui</Badge></Col> : null}
                                {props.item.pertukaran.statusAdmin.toString()=="Ditolak" ? <Col>Admin: <Badge pill bg="danger" style={{border:"2px solid black", color:"black"}}>Ditolak</Badge></Col> : null}
                        </Row>
                        <Row className="text-center my-1">
                                {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? <Col>Dosen: <Badge pill bg="warning" style={{border:"2px solid black", color:"black"}}> Belum Disetujui</Badge></Col> : null}
                                {props.item.pertukaran.statusDosen2.toString()=="Disetujui" ? <Col>Dosen: <Badge pill bg="success" style={{border:"2px solid black", color:"black"}}>Disetujui</Badge></Col> : null}
                                {props.item.pertukaran.statusDosen2.toString()=="Ditolak" ? <Col>Dosen: <Badge pill bg="danger" style={{border:"2px solid black", color:"black"}}>Ditolak</Badge></Col> : null}
                        </Row>
                    </Col>
                    <Col className="text-center align-content-center">
                        {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? 
                            <DeleteButton page={"Pertukaran Jadwal"} idPertukaran={props.item.pertukaran.id} pertukaran={props.pertukaran} setPertukaran={props.setPertukaran}/>
                        :
                            null
                        }
                    </Col>
                    </Row>
                </CardBody>
            </Card> 
        </>
    )
}

export default ItemPengajuanSaya;