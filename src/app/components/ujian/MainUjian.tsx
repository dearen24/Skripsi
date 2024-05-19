"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getUjian, getUjianBySemester} from "../../actions/ujian";
import ItemUjian from "./ItemUjian";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";
import ToastSuccessDelete from "../toast/SuccessDelete";

export default function MainUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [selectedData,setSelectedData] = useState(new Object);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUjianBySemester(props.semester.id,"UTS");
            const semester = await getSemester();
            const ujianDate = [];
            let index = 0;

            for(let i = 0;i<data.length;i++){
                if(i!=0){
                    const dateBefore = String(data[i-1].date).split(" ")[1]+" "+String(data[i-1].date).split(" ")[2]+" "+String(data[i-1].date).split(" ")[3];
                    const dateNow = String(data[i].date).split(" ")[1]+" "+String(data[i].date).split(" ")[2]+" "+String(data[i].date).split(" ")[3];
                    
                    if(dateBefore==dateNow){
                        ujianDate[index].push(data[i]);
                    }
                    else{
                        index++;
                        ujianDate.push([data[i]]);
                    }
                }
                else{
                    ujianDate.push([data[i]]);
                }
            }

            setSelectedData({date:ujianDate[0][0].date.toISOString(),tipe:"UTS",semester:props.semester.id});
            setSemester(semester);
            setUjian(ujianDate)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        for(let i = 0;i<data.length;i++){
            if(data[i].length==0){
                data.splice(i,1);
            }
        }
        setUjian(data);
        router.refresh();
        openToastTambah();
    }

    const addUjian = () => {
        router.push("/admin/ujian/add");
    }

    const handleChangeSemester = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.semester = e.target.value;
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const ujianDate = [];
        let index = 0;

        for(let i = 0;i<ujianTemp.length;i++){
            if(i!=0){
                const dateBefore = String(ujianTemp[i-1].date).split(" ")[1]+" "+String(ujianTemp[i-1].date).split(" ")[2]+" "+String(ujianTemp[i-1].date).split(" ")[3];
                const dateNow = String(ujianTemp[i].date).split(" ")[1]+" "+String(ujianTemp[i].date).split(" ")[2]+" "+String(ujianTemp[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    ujianDate[index].push(ujianTemp[i]);
                }
                else{
                    index++;
                    ujianDate.push([ujianTemp[i]]);
                }
            }
            else{
                ujianDate.push([ujianTemp[i]]);
            }
        }

        
        if(ujianDate.length!=0){
            dataTemp.date = ujianDate[0][0].date.toISOString();
        }
        setSelectedData(dataTemp);
        setUjian(ujianDate);
    }

    const handleChangeTipe = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.tipe = e.target.value;
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const ujianDate = [];
        let index = 0;

        for(let i = 0;i<ujianTemp.length;i++){
            if(i!=0){
                const dateBefore = String(ujianTemp[i-1].date).split(" ")[1]+" "+String(ujianTemp[i-1].date).split(" ")[2]+" "+String(ujianTemp[i-1].date).split(" ")[3];
                const dateNow = String(ujianTemp[i].date).split(" ")[1]+" "+String(ujianTemp[i].date).split(" ")[2]+" "+String(ujianTemp[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    ujianDate[index].push(ujianTemp[i]);
                }
                else{
                    index++;
                    ujianDate.push([ujianTemp[i]]);
                }
            }
            else{
                ujianDate.push([ujianTemp[i]]);
            }
        }

        if(ujianDate.length!=0){
            dataTemp.date = ujianDate[0][0].date.toISOString();
        }
        setSelectedData(dataTemp);
        setUjian(ujianDate);
    }

    const handleChangeDate = (e) => {
        const tempData = {...selectedData};
        tempData.date = e.target.value;
        setSelectedData(tempData);
    }

    if(isLoading){
        return <LoadingPage/>
    }
    
    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Ujian</strong></h3>
                <button className="btn btn-dark my-1" onClick={addUjian} style={{backgroundColor:"#272829"}}><strong>Tambah Ujian</strong></button>
            </div>
            <div className="d-flex flex-row align-items-center mb-1">
                <div className="px-1">
                        <FormSelect onChange={handleChangeSemester} style={{border:"2px solid black"}}>
                            {semester.map((sem)=>(
                            sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                        ))}
                    </FormSelect>
                </div>
                <div className="">
                    <FormSelect onChange={handleChangeTipe} style={{border:"2px solid black"}}>
                        <option value="UTS">UTS</option>
                        <option value="UAS">UAS</option>
                    </FormSelect>
                </div>
                <div className="px-1">
                    <FormSelect onChange={handleChangeDate} style={{border:"2px solid black"}}>
                        {ujian.map((u)=>(
                            u[0].date.toISOString()==selectedData.date ?
                            <option value={u[0].date.toISOString()} selected>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                            :
                            <option value={u[0].date.toISOString()}>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                        ))}
                    </FormSelect>
                </div>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Waktu Mulai</strong>
                            </Col>
                            <Col>
                                <strong>Waktu Selesai</strong>
                            </Col>
                            <Col>
                                <strong>Metode Ujian</strong>
                            </Col>
                            <Col>
                                <strong>Masa Ujian</strong>
                            </Col>
                            <Col>
                                <strong>Shift</strong>
                            </Col>
                            <Col>
                                <strong>Mata Kuliah</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {ujian.map((uj)=>(
                    selectedData.date==uj[0].date.toISOString() ?
                    uj.map((u)=>(
                        <ItemUjian key={u.id} ujian={u} allUjian={ujian} setUjian={changeData}/>
                    ))
                    :
                    null
                ))}
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ujian"}/>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Ujian</h1>
    //             <div className="d-flex flex-row align-items-center">
    //                 <div>
    //                     <button className="btn btn-dark my-1" onClick={addUjian}>Tambah Ujian</button>
    //                 </div>
    //                 <div className="px-1">
    //                     <FormSelect onChange={handleChangeSemester}>
    //                         {semester.map((sem)=>(
    //                             sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //                 <div className="px-1">
    //                     <FormSelect onChange={handleChangeTipe}>
    //                         <option value="UTS">UTS</option>
    //                         <option value="UAS">UAS</option>
    //                     </FormSelect>
    //                 </div>
    //                 <div className="">
    //                     <FormSelect onChange={handleChangeDate}>
    //                         {ujian.map((u)=>(
    //                             u[0].date.toISOString()==selectedData.date ?
    //                             <option value={u[0].date.toISOString()} selected>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
    //                             :
    //                             <option value={u[0].date.toISOString()}>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //             </div>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Tanggal</th>						
    //                             <th className="text-center">Waktu Mulai</th>
    //                             <th className="text-center">Waktu Selesai</th>
    //                             <th className="text-center">Tipe Ujian</th>
    //                             <th className="text-center">Metode Ujian</th>
    //                             <th className="text-center">Shift</th>
    //                             <th className="text-center">Semester</th>
    //                             <th className="text-center">Mata Kuliah</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     {ujian.map((uj)=>(
    //                         selectedData.date==uj[0].date.toISOString() ?
    //                         uj.map((u)=>(
    //                             <ItemUjian key={u.id} ujian={u} allUjian={ujian} setUjian={changeData}/>
    //                         ))
    //                         :
    //                         null
    //                     ))}
    //                 </table>
    //             </div>
    //         </div>

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ujian"}/>
    //     </>
    // )
}