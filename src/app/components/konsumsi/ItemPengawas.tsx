"use client"
import { Form } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react";

const ItemPengawas = (props) => {
    const [itemSelect, setItemSelect] = useState(new Object);
    const [selectIndex,setSelectIndex] = useState(Number(0));

    const date = String(props.ujian.ujian.date).split(" ");
    const mulai = String(props.ujian.ujian.mulai).split(" ")[4].substring(0,5);
    const selesai = String(props.ujian.ujian.selesai).split(" ")[4].substring(0,5);


    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const items = {...itemSelect}
                let index = props.ujian.dosen.length+1;
                for(let i = 0;i<props.ujian.dosen.length;i++){
                    items[i+1] = {id:props.ujian.dosen[i].id};
                }
                setItemSelect(items);
                setSelectIndex(index);
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
            props.handleChange(null,items[index].id,true,props.ujian.id);
        }
        delete items[index];
        setItemSelect(items);
    }

    const handleChangePengawas = (e) => {
        const idSelect = Number(e.target.id);
        const itemTemp = {...itemSelect};
        props.handleChange(e.target.value,itemTemp[idSelect].id,false,props.ujian.id);
        itemTemp[idSelect].id = e.target.value;
        setItemSelect(itemTemp);
    }

    return(
        <tbody>
            <tr>
                <td className="text-center">{date[0]+", "+date[1]+" "+date[2]+" "+date[3]}</td>
                <td className="text-center">{mulai}</td>
                <td className="text-center">{selesai}</td>                        
                <td className="text-center">{props.ujian.ujian.metode}</td>
                <td className="text-center">{props.ujian.ujian.tipe}</td>
                <td className="text-center">{props.ujian.ujian.shift}</td>
                <td className="text-center">{props.ujian.ruangan.nama}</td>
                <td className="text-center">
                    {props.ujian.ujian.matkul.map((matkul)=>(
                        <div><a>{matkul.nama}</a></div>    
                    ))}
                </td>
                <td className="text-center">
                    <div className="d-flex flex-column justify-content-center my-1">
                        {Object.keys(itemSelect).map(([key,value],index)=>(
                            <div className="d-flex flex-row">  
                                <div>
                                    <Form.Select aria-label="Pengawas" id={String(key)} key={key} onChange={handleChangePengawas} disabled={props.hiddenAndDisabled}>
                                            <option selected>-- Pilih Dosen Pengawas --</option>
                                            {props.dosen.map((item)=>(
                                                itemSelect[key].id==item.id ?  
                                                <option value={item.id} selected>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>:
                                                <option value={item.id}>{item.nama+" - ("+item.role.kuotaMengawas+")"}</option>
                                            ))}
                                    </Form.Select>
                                </div>
                                <div className="px-1">
                                    <button className="btn btn-outline-danger" id={String(key)} onClick={deleteField} hidden={props.hiddenAndDisabled}>
                                        <Image src="/trash-fill.svg" alt="Edit" width={20} height={20} style={{pointerEvents:'none'}}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                    <button className="btn btn-outline-success mx-1" onClick={addField} hidden={props.hiddenAndDisabled}>
                        <Image src="/plus-lg.svg" alt="Edit" width={20} height={20}/>
                    </button>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemPengawas;