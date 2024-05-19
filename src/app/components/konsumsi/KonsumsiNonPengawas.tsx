"use client"
import { useEffect, useState } from "react";
import LoadingPengguna from "../../admin/dosen/loading";
import {getKonsumsiNonPengawas} from "../../actions/konsumsi"
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import { useRouter } from "next/navigation";
import ItemKonsumsi from "./ItemKonsumsi";
import ToastSuccessDelete from "../toast/SuccessDelete";
import LoadingPage from "../LoadingPage";


export default function KonsumsiNonPengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [semester, setSemester] = useState(new Object);
    const [konsumsi, setKonsumsi] = useState(new Object);
    const [toast, setToast] = useState(false);
    const [selectedData, setSelectedData] = useState(new Object);
    const router = useRouter();

    const closeToast = () => setToast(false);
    const openToast= () => setToast(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const semester = await getSemester();
            const konsumsi = await getKonsumsiNonPengawas(props.semester.id,"UTS");

            setKonsumsi(konsumsi);
            setSemester(semester);
            setSelectedData({tipe:"UTS",semester:props.semester.id});
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const onChangeSemester = (e) => {
        const tempData = {...selectedData};
        tempData.semester = e.target.value;
        setSelectedData(tempData);
    }

    const onChangeTipe = (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;
        setSelectedData(tempData);
    }

    const addKonsumsi = () => {
        router.push("/admin/konsumsi/add");
    }

    const changeData = async (data) => {
        setKonsumsi(data);
        router.refresh();
        openToast();
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
            <div className="d-flex flex-row py-1">
                    <div>
                        <FormSelect onChange={onChangeSemester} style={{border:"2px solid black"}}>
                            {semester.map((sem)=>(
                                sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={onChangeTipe} style={{border:"2px solid black"}}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <div>
                    <button className="btn" onClick={addKonsumsi} style={{backgroundColor:"#272829", color:"white"}}>Tambah Konsumsi Non Pengawas</button>
                </div>
                <h4>Daftar Konsumsi Non-Pengawas</h4>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Tanggal</strong>
                            </Col>
                            <Col>
                                <strong>Snack</strong>
                            </Col>
                            <Col>
                                <strong>Lunch</strong>
                            </Col>
                            <Col>
                                <strong>Catatan</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {konsumsi.map((konsum)=>(
                    <ItemKonsumsi key={konsum.id} konsum={konsum} konsumsi={konsumsi} setKonsumsi={changeData}/>
                ))}
            </div>
            <ToastSuccessDelete toastTambah={toast} closeToastTambah={closeToast} page={"Konsumsi Non-Pengawas"}/>
        </div>
    )
    
    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <div className="d-flex flex-row py-1">
    //                 <div>
    //                     <FormSelect onChange={onChangeSemester}>
    //                         {semester.map((sem)=>(
    //                             sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //                 <div className="px-1">
    //                     <FormSelect onChange={onChangeTipe}>
    //                         <option value="UTS">UTS</option>
    //                         <option value="UAS">UAS</option>
    //                     </FormSelect>
    //                 </div>
    //             </div>
    //             <div>
    //                 <button className="btn" onClick={addKonsumsi} style={{backgroundColor:"#272829", color:"white"}}>Tambah Konsumsi Non Pengawas</button>
    //             </div>
    //             <h4>Daftar Konsumsi Non-Pengawas</h4>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th className="text-center">Tanggal</th>						
    //                             <th className="text-center">Snack</th>
    //                             <th className="text-center">Lunch</th>
    //                             <th className="text-center">Catatan</th>
    //                             <th className="text-center">Action</th>
    //                         </tr>
    //                     </thead>
    //                     {konsumsi.map((konsum)=>(
    //                         <ItemKonsumsi key={konsum.id} konsum={konsum} konsumsi={konsumsi} setKonsumsi={changeData}/>
    //                     ))}
    //                 </table>
    //             </div>
    //         </div>

    //         <ToastSuccessDelete toastTambah={toast} closeToastTambah={closeToast} page={"Konsumsi Non-Pengawas"}/>
    //     </>
    // )
}