"use client"

import ItemDosen from "./ItemDosen";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {getUser} from "../../actions/user"
import { Card, CardBody, CloseButton, Col, Container, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import LoadingPengguna from "../../admin/dosen/loading";
import { useSession } from "next-auth/react";
import { getSessionServer } from "@/modules/session";
import ToastSuccessDelete from "../toast/SuccessDelete";
import LoadingPage from "../LoadingPage";

export default function MainPengguna(){
    const [isLoading,setLoading] = useState(true);
    const [pengguna, setPengguna] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedPengguna, setDisplayedPengguna] = useState(new Object);
    const spinner = [1,1,1];
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUser();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedPengguna(data.slice(0,10));
            setPengguna(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setPengguna(data);
        setDisplayedPengguna(data.slice(0,10));
        setMaxPage(Math.ceil(data.length/10));
        setPage(1);
        router.refresh();
        openToastTambah();
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedPengguna(pengguna.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedPengguna(pengguna.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const addPengguna = () => {
        router.push("/admin/dosen/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Pengguna</strong></h3>
                <button className="btn btn-dark my-1" onClick={addPengguna} style={{backgroundColor:"#272829"}}><strong>Tambah Pengguna</strong></button>
                <input className="form-control w-25 mb-1" placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Nama</strong>
                            </Col>
                            <Col>
                                <strong>NIK</strong>
                            </Col>
                            <Col>
                                <strong>Email</strong>
                            </Col>
                            <Col>
                                <strong>Jabatan</strong>
                            </Col>
                            <Col>
                                <strong>Kuota Mengawas</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ?
                    displayedPengguna.map((user)=>(
                        <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
                    ))
                    :
                    pengguna.map((user)=>(
                        user.nama.toLowerCase().includes(search.toLowerCase()) ?
                        <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
                        :
                        null
                    ))
                }
                {search=="" && pengguna.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Pengguna"}/>
        </div>
    )
    
    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Pengguna</h1>
    //             <button className="btn btn-dark my-1" onClick={addPengguna} style={{backgroundColor:"#272829"}}><strong>Tambah Pengguna</strong></button>
    //             <input className="form-control w-25 mb-1" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle" >
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama</th>						
    //                             <th className="text-center">NIK</th>
    //                             <th className="text-center">Email</th>
    //                             <th className="text-center">Jabatan</th>
    //                             <th className="text-center">Kuota Mengawas</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody style={{backgroundColor:"red"}}>
    //                         {search=="" ?
    //                         displayedPengguna.map((user)=>(
    //                             <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
    //                         ))
    //                         :
    //                         pengguna.map((user)=>(
    //                             user.nama.toLowerCase().includes(search.toLowerCase()) ?
    //                             <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
    //                             :
    //                             null
    //                         ))
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //             {search=="" && pengguna.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div>

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Pengguna"}/>
    //     </>
    // )
}