"use client"
import { Card, CardBody, Col, Form, Row } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMatkulujianByMatkulId } from "@/app/actions/matkulujian";

const ItemPengawas = (props) => {
    const [itemSelect, setItemSelect] = useState(new Object);
    const [selectIndex,setSelectIndex] = useState(Number(0));
    const [dosenPengajar, setDosenPengajar] = useState();
    const [loading, setLoading] = useState(true);

    const date = String(props.ujian.date).split(" ");
    const mulai = String(props.ujian.mulai).split(" ")[4].substring(0,5);
    const selesai = String(props.ujian.selesai).split(" ")[4].substring(0,5);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const items = {...itemSelect}
                let index = props.ruangandosen.dosen.length+1;
                for(let i = 0;i<props.ruangandosen.dosen.length;i++){
                    items[i+1] = {id:props.ruangandosen.dosen[i].id};
                }

                const arrDosenPengajar = [];
                for(let i = 0;i<props.ujian.matkul.length;i++){
                    const data = await getMatkulujianByMatkulId(props.ujian.matkul[i].id);
                    arrDosenPengajar.push(data);
                }

                setDosenPengajar(arrDosenPengajar);
                setItemSelect(items);
                setSelectIndex(index);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const addField = () => {
        const items = {...itemSelect};
        let index = selectIndex;
        items[index] = {id:""};
        index = index+1;
        setSelectIndex(index);
        setItemSelect(items);
        //Object.keys(itemSelect).map(([key,value],index)=>(console.log(itemSelect[key].id)));
    }

    const deleteField = (e) => {
        const items = {...itemSelect};
        const index = Number(e.target.id);
        if(items[index].id!=""){//klo belom diisi
            props.handleChange(null,items[index].id,true,props.indexUjian,props.indexRuanganDosen);
        }
        delete items[index];
        setItemSelect(items);
    }

    const handleChangePengawas = (e) => {
        const idSelect = Number(e.target.id);
        const itemTemp = {...itemSelect};
        props.handleChange(e.target.value,itemTemp[idSelect].id,false,props.indexUjian,props.indexRuanganDosen);
        itemTemp[idSelect].id = e.target.value;
        setItemSelect(itemTemp);
    }

    if(props.hidden){
        return null;
    }
    if(loading){
        return null;
    }
    else{

        return(
            <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
                <CardBody>
                    <Row className="text-center">
                        <Col className="align-content-center">
                            <strong>{mulai+" - "+selesai}</strong>
                        </Col>
                        <Col className="align-content-center">
                            <strong>{props.ujian.metode}</strong>
                        </Col>
                        <Col className="align-content-center">
                            <strong>{props.ujian.shift}</strong>
                        </Col>
                        <Col className="align-content-center">
                            <strong>{props.ruangandosen.nama}</strong>
                        </Col>
                        <Col className="align-content-center">
                            {props.ujian.matkul.map((matkul)=>(
                                <div><strong>{matkul.nama}</strong></div>    
                            ))}
                        </Col>
                        <Col className="align-content-center">
                            {dosenPengajar.map((dosen)=>(
                                <div><strong>{dosen.dosenPengajar[0].nama}</strong></div>    
                            ))}
                        </Col>
                        <Col className="align-content-center">
                        <div className="d-flex flex-column justify-content-center my-1">
                            {Object.keys(itemSelect).map(([key,value],index)=>(
                                <div className="d-flex flex-row py-1">  
                                    <div>
                                        <Form.Select aria-label="Pengawas" id={String(key)} key={key} onChange={handleChangePengawas} disabled={props.hiddenAndDisabled} style={{border:"2px solid black"}}>
                                                <option selected>-- Pilih Dosen Pengawas --</option>
                                                {props.dosen.map((item)=>(
                                                    Number(item.role.kuotaMengawas)<=0 ?
                                                        itemSelect[key].id==item.id ?  
                                                            <option value={item.id} selected style={{backgroundColor:"red"}}>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
                                                            :
                                                            <option value={item.id} style={{backgroundColor:"red"}}>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
                                                    :
                                                        itemSelect[key].id==item.id ?  
                                                            <option value={item.id} selected>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
                                                            :
                                                            <option value={item.id}>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
                                                ))}
                                        </Form.Select>
                                    </div>
                                    <div className="px-1">
                                        <button className="btn btn-outline-danger" id={String(key)} onClick={deleteField} hidden={props.hiddenAndDisabled} style={{border:"2px solid black"}}>
                                            <Image src="/trash-fill.svg" alt="Edit" width={20} height={20} style={{pointerEvents:'none'}}/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        </Col>
                        <Col className="align-content-center">
                            <div className="d-flex flex-row justify-content-center">
                                <button className="btn btn-outline-success mx-1" onClick={addField} hidden={props.hiddenAndDisabled} style={{border:"2px solid black"}}>
                                    <Image src="/plus-lg.svg" alt="Edit" width={20} height={20}/>
                                </button>
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
        //             <td className="text-center">{props.ujian.metode}</td>
        //             <td className="text-center">{props.ujian.shift}</td>
        //             <td className="text-center">{props.ruangandosen.nama}</td>
        //             <td className="text-center">
        //                 {props.ujian.matkul.map((matkul)=>(
        //                     <div><a>{matkul.nama}</a></div>    
        //                 ))}
        //             </td>
        //             <td className="text-center">
        //                 {dosenPengajar.map((dosen)=>(
        //                     <div><a>{dosen.dosenPengajar[0].nama}</a></div>    
        //                 ))}
        //             </td>
        //             <td className="text-center">
        //                 <div className="d-flex flex-column justify-content-center my-1">
        //                     {Object.keys(itemSelect).map(([key,value],index)=>(
        //                         <div className="d-flex flex-row py-1">  
        //                             <div>
        //                                 <Form.Select aria-label="Pengawas" id={String(key)} key={key} onChange={handleChangePengawas} disabled={props.hiddenAndDisabled}>
        //                                         <option selected>-- Pilih Dosen Pengawas --</option>
        //                                         {props.dosen.map((item)=>(
        //                                             itemSelect[key].id==item.id ?  
        //                                             <option value={item.id} selected>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>:
        //                                             <option value={item.id}>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
        //                                         ))}
        //                                 </Form.Select>
        //                             </div>
        //                             <div className="px-1">
        //                                 <button className="btn btn-outline-danger" id={String(key)} onClick={deleteField} hidden={props.hiddenAndDisabled}>
        //                                     <Image src="/trash-fill.svg" alt="Edit" width={20} height={20} style={{pointerEvents:'none'}}/>
        //                                 </button>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </td>
        //             <td className="text-center">
        //                 <div className="d-flex flex-row justify-content-center">
        //                 <button className="btn btn-outline-success mx-1" onClick={addField} hidden={props.hiddenAndDisabled}>
        //                     <Image src="/plus-lg.svg" alt="Edit" width={20} height={20}/>
        //                 </button>
        //                 </div>
        //             </td>
        //         </tr>
        //     </tbody>
        // )
    }

}

export default ItemPengawas;