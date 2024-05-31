"use client"
import { Card, CardBody, Col, Row, Table } from "react-bootstrap";

const ItemJadwalSaya = (props) => {

    const setSelected = (e) => {
        props.setSelectedJadwalSaya(e.target.parentElement.id);
    }

    const clearSelection = (e) => {
        props.setSelectedJadwalSaya("");
    }

    return(
        <>
            <h6>Pilih jadwal Anda yang ingin ditukar</h6>
            <button className="btn my-1" onClick={clearSelection} style={{backgroundColor:"#272829", color:"white"}}>Clear Selection</button>
            <div>
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Tanggal</strong>
                            </Col>
                            <Col>
                                <strong>Waktu Mulai</strong>
                            </Col>
                            <Col>
                                <strong>Waktu Selesai</strong>
                            </Col>
                            <Col>
                                <strong>Mata Kuliah</strong>
                            </Col>
                            <Col>
                                <strong>Ruangan</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {props.jadwalsaya.map((jadwal)=>(
                    props.selectedJadwalSaya == jadwal.id?
                    <Card className="my-1" onClick={setSelected} id={jadwal.id} style={{borderRadius:"10px",border:"2px solid black", backgroundColor:"#83F28F", cursor:"pointer"}}>
                        <CardBody id={jadwal.id}>
                            <Row className="text-center" id={jadwal.id}>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="d-flex flex-column" id={jadwal.id}>
                                    {jadwal.ujian.matkul.map((matkul)=>(
                                        <span>{matkul.nama}</span>
                                    ))}
                                </Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ruangan.nama}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                    :
                    <Card className="my-1" onClick={setSelected} id={jadwal.id} style={{borderRadius:"10px",border:"2px solid black", cursor:"pointer"}}>
                        <CardBody id={jadwal.id}>
                            <Row className="text-center" id={jadwal.id}>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</Col>
                                <Col className="d-flex flex-column" id={jadwal.id}>
                                    {jadwal.ujian.matkul.map((matkul)=>(
                                        <span>{matkul.nama}</span>
                                    ))}
                                </Col>
                                <Col className="align-content-center" id={jadwal.id}>{jadwal.ruangan.nama}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default ItemJadwalSaya;