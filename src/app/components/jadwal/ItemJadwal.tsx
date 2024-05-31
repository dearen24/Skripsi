"use client"
import { Accordion, Col, Row } from "react-bootstrap";

const ItemJadwal = (props) => {

    return(
        <>
            {props.data.map((ujian)=>(
                props.search=="" ?
                <Accordion className="mx-1 my-1" style={{border:"2px solid black",borderRadius:"8px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Row className="w-100">
                                <Col>
                                    <div className="d-flex flex-column">
                                        {ujian.matkul.map((matkul)=>(
                                            <div>
                                                <strong>{matkul.kode+" - "+matkul.nama}</strong>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        {ujian.ruangandosen.map((item)=>(
                                            <div>
                                                <strong>{item.nama}</strong>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        <strong>{ujian.mulai.toString().split(" ")[4].substring(0,5)} - {ujian.selesai.toString().split(" ")[4].substring(0,5)}</strong>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        {ujian.shift==0 ? <strong>Tidak Ada Shift</strong> :
                                            <strong>Shift: {ujian.shift}</strong>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                            {ujian.ruangandosen.map((item,index)=>(
                                <Row className="w-100">
                                    <Col>
                                        <div>
                                            <strong>Ruangan {index+1}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <strong>{item.nama}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="d-flex flex-column">
                                            <strong>Pengawas :</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="d-flex flex-column">
                                            {item.dosen.map((item2)=>(
                                                <div>
                                                    <strong>{item2.nama}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                :
                ujian.ujian.map((dosen)=>(
                    dosen.dosen.nama.toLowerCase().includes(props.search.toLowerCase()) ?
                    <Accordion className="mx-1 my-1" style={{border:"2px solid black",borderRadius:"8px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Row className="w-100">
                                <Col>
                                    {ujian.matkul.map((matkul)=>(
                                        <strong>{matkul.kode+" - "+matkul.nama}</strong>
                                    ))}
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        {ujian.ruangandosen.map((item)=>(
                                            <div>
                                                <strong>{item.nama}</strong>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        <strong>{ujian.mulai.toString().split(" ")[4].substring(0,5)} - {ujian.selesai.toString().split(" ")[4].substring(0,5)}</strong>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="d-flex flex-column">
                                        {ujian.shift==0 ? <strong>Tidak Ada Shift</strong> :
                                            <strong>Shift: {ujian.shift}</strong>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Accordion.Header>
                        <Accordion.Body>
                            {ujian.ruangandosen.map((item,index)=>(
                                <Row className="w-100">
                                    <Col>
                                        <div>
                                            <strong>Ruangan {index+1}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div>
                                            <strong>{item.nama}</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="d-flex flex-column">
                                            <strong>Pengawas :</strong>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="d-flex flex-column">
                                            {item.dosen.map((item2)=>(
                                                <div>
                                                    <strong>{item2.nama}</strong>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                    :
                    null
                ))
            ))}
        </>
    )
}

{/* <>
            {props.data.map((ujian)=>(
                props.search=="" ?
                <Accordion className="mx-1 my-1" style={{border:"2px solid black",borderRadius:"8px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="px-2 w-100">
                                <table className="table align-middle" style={{borderBottom:"solid white"}}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.matkul.map((matkul)=>(
                                                        <div>
                                                            <span>{matkul.kode+" - "+matkul.nama}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.ruangandosen.map((item)=>(
                                                        <div>
                                                            <span>{item.nama}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    <span>{ujian.mulai.toString().split(" ")[4].substring(0,5)} - {ujian.selesai.toString().split(" ")[4].substring(0,5)}</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.shift==0 ? <span>Tidak Ada Shift</span> :
                                                        <span>Shift: {ujian.shift}</span>
                                                    }
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="w-100">
                                <table className="table align-middle" style={{borderBottom:"solid white"}}>
                                    <tbody>
                                        {ujian.ruangandosen.map((item,index)=>(
                                            <tr>
                                                <>
                                                    <th>
                                                        <div>
                                                            <span>Ruangan {index+1}</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>
                                                            <span>{item.nama}</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="d-flex flex-column">
                                                            <span>Pengawas :</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="d-flex flex-column">
                                                            {item.dosen.map((item2)=>(
                                                                <div>
                                                                    <span>{item2.nama}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </th>
                                                </>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                :
                ujian.ujian.map((dosen)=>(
                    dosen.dosen.nama.toLowerCase().includes(props.search.toLowerCase()) ?
                    <Accordion className="mx-1 my-1" style={{border:"2px solid black",borderRadius:"8px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <div className="px-2 w-100">
                                <table className="table align-middle">
                                    <tbody>
                                        <tr>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.matkul.map((matkul)=>(
                                                        <div>
                                                            <span>{matkul.kode+" - "+matkul.nama}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.ruangandosen.map((item)=>(
                                                        <div>
                                                            <span>{item.nama}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    <span>{ujian.mulai.toString().split(" ")[4].substring(0,5)} - {ujian.selesai.toString().split(" ")[4].substring(0,5)}</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex flex-column">
                                                    {ujian.shift==0 ? <span>Tidak Ada Shift</span> :
                                                        <span>Shift: {ujian.shift}</span>
                                                    }
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="w-100">
                                <table className="table align-middle">
                                    <tbody>
                                        {ujian.ruangandosen.map((item,index)=>(
                                            <tr>
                                                <>
                                                    <th>
                                                        <div>
                                                            <span>Ruangan {index+1}</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div>
                                                            <span>{item.nama}</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="d-flex flex-column">
                                                            <span>Pengawas :</span>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <div className="d-flex flex-column">
                                                            {item.dosen.map((item2)=>(
                                                                <div>
                                                                    <span>{item2.nama}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </th>
                                                </>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                    :
                        null
                ))
            ))}
        </> */}

export default ItemJadwal;