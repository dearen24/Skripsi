"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemAturan from "./ItemAturan";
import { getAturanKonsumsiAll } from "@/app/actions/konsumsi";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

export default function MainAturan(){
    const [isLoading,setLoading] = useState(true);
    const [aturan, setAturan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getAturanKonsumsiAll();
                setAturan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setAturan(data);
        router.refresh();
        openToastTambah();
    }
    
    const addAturan = () => {
        router.push("/admin/aturankonsumsi/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Aturan Konsumsi</strong></h3>
                <button className="btn btn-dark my-1" onClick={addAturan} style={{backgroundColor:"#272829"}}><strong>Tambah Aturan Konsumsi</strong></button>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>#</strong>
                            </Col>
                            <Col>
                                <strong>8 - 10</strong>
                            </Col>
                            <Col>
                                <strong>10 - 12</strong>
                            </Col>
                            <Col>
                                <strong>11 - 13</strong>
                            </Col>
                            <Col>
                                <strong>12 - 14</strong>
                            </Col>
                            <Col>
                                <strong>14 - 16</strong>
                            </Col>
                            <Col>
                                <strong>Snack</strong>
                            </Col>
                            <Col>
                                <strong>Lunch</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {aturan.map((rule,index)=>(
                    <ItemAturan key={rule.id} index={index} rule={rule} aturan={aturan} setAturan={changeData} />
                ))}
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Aturan Konsumsi"}/>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Aturan Konsumsi</h1>
    //             <button className="btn btn-dark my-1" onClick={addAturan}>Tambah Aturan</button>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th className="text-center">#</th>
    //                             <th className="text-center">Sebelum Pukul 12</th>						
    //                             <th className="text-center">Melewati Pukul 12</th>
    //                             <th className="text-center">Setelah Pukul 12</th>
    //                             <th className="text-center">Konsumsi</th>
    //                             <th className="text-center">Action</th>
    //                         </tr>
    //                     </thead>
    //                     {aturan.map((rule,index)=>(
    //                         <ItemAturan key={rule.id} index={index} rule={rule} aturan={aturan} setAturan={changeData} />
    //                     ))}
    //                 </table>
    //             </div>
    //         </div> 

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Aturan Konsumsi"}/>
    //     </>
    // )
}