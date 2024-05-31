"use client"
import { useEffect, useState } from "react";
import { EditButton } from "../buttons/EditButton";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ItemRuanganUjian = (ujian) => {
    const [ruangan,setRuangan] = useState(new Array);

    const date = String(ujian.ujian.date).split(" ");
    const mulai = String(ujian.ujian.mulai).split(" ")[4].substring(0,5);
    const selesai = String(ujian.ujian.selesai).split(" ")[4].substring(0,5);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const ruanganTemp = [];
                for(let i = 0;i<ujian.ujian.ujian.length;i++){
                    if(ruanganTemp.some(ruangan=>ruangan.id == ujian.ujian.ujian[i].ruangan.id)==false){
                        ruanganTemp.push(ujian.ujian.ujian[i].ruangan);
                    }
                }

                setRuangan(ruanganTemp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return(
        <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
            <CardBody>
                <Row className="text-center">
                    <Col className="align-content-center">
                        <strong>{mulai}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{selesai}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.metode}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.tipe}</strong>
                    </Col>
                    <Col className="align-content-center">
                        <strong>{ujian.ujian.shift}</strong>
                    </Col>
                    <Col className="align-content-center">
                        {ruangan.map((ruangan)=>(
                            <div><strong>{ruangan.nama}</strong></div>    
                        ))}
                    </Col>
                    <Col className="align-content-center">
                        {ujian.ujian.matkul.map((matkul)=>(
                            <div><strong>{matkul.nama}</strong></div>    
                        ))}
                    </Col>
                    <Col className="align-content-center">
                        <div className="d-flex flex-row justify-content-center">
                         <EditButton page={"Ruangan Ujian"} idUjian={ujian.ujian.id}/>
                      </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )

    // return(
    //     <tbody>
    //         <tr>
    //             <td className="text-center">{date[0]+", "+date[1]+" "+date[2]+" "+date[3]}</td>
    //             <td className="text-center">{mulai}</td>
    //             <td className="text-center">{selesai}</td>                        
    //             <td className="text-center">{ujian.ujian.metode}</td>
    //             <td className="text-center">{ujian.ujian.tipe}</td>
    //             <td className="text-center">{ujian.ujian.shift}</td>
    //             {ujian.ujian.ujian.length==0 ? <td className="text-center">-</td> : 
    //             <td className="text-center">
    //                 {ruangan.map((ruangan)=>(
    //                     <div><a>{ruangan.nama}</a></div>    
    //                 ))}    
    //             </td>}
    //             <td className="text-center">
    //                 {ujian.ujian.matkul.map((matkul)=>(
    //                     <div><a>{matkul.nama}</a></div>    
    //                 ))}
    //             </td>
    //             <td className="text-center">
    //                 <div className="d-flex flex-row justify-content-center">
    //                     <EditButton page={"Ruangan Ujian"} idUjian={ujian.ujian.id}/>
    //                 </div>
    //             </td>
    //         </tr>
    //     </tbody>
    // )
}

export default ItemRuanganUjian;