"use client"

import ItemMatkulUjian from "./ItemMatkulujian";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getMatkulUjian, getMatkulUjianBySemester} from "../../actions/matkulujian";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";

export default function MainMatkulUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [matkulujian, setMatkulujian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedMatkulUjian, setDisplayedMatkulUjian] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getMatkulUjianBySemester(props.semester.id);
            const semester = await getSemester();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedMatkulUjian(data.slice(0,10));
            setSemester(semester);
            setMatkulujian(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setMatkulujian(data);
        setDisplayedMatkulUjian(data.slice(0,10));
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
            setDisplayedMatkulUjian(matkulujian.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedMatkulUjian(matkulujian.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const AddMatkulUjian = () => {
        router.push("/admin/matkulujian/add");
    }

    const handleChangeSemester = async (e) => {
        const idSemester = e.target.value;
        const data = await getMatkulUjianBySemester(idSemester);
        setMatkulujian(data);
        setDisplayedMatkulUjian(data.slice(0,10));
        setMaxPage(Math.ceil(data.length/10));
    }

    if(isLoading){
        return <LoadingPage/>
    }
    
    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Mata Kuliah Ujian</strong></h3>
                <button className="btn btn-dark my-1" onClick={AddMatkulUjian} style={{backgroundColor:"#272829"}}><strong>Tambah Mata Kuliah Ujian</strong></button>
            </div>
            <div className="d-flex flex-row align-items-center mb-1 mx-1">
                <div>
                    <input className="form-control w-100 " placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
                </div>
                <div className="px-1">
                    <FormSelect onChange={handleChangeSemester} style={{border:"2px solid black"}}>
                            {semester.map((sem)=>(
                            sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                        ))}
                    </FormSelect>
                </div>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Mata Kuliah</strong>
                            </Col>
                            <Col>
                                <strong>Dosen Pengajar</strong>
                            </Col>
                            <Col>
                                <strong>Jumlah Peserta</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ? 
                displayedMatkulUjian.map((matkulu)=>(
                    <ItemMatkulUjian key={matkulu.id} matkulujian={matkulu} allmatkulujian={matkulujian} setMatkulujian={changeData}/>
                ))
                :
                matkulujian.map((matkulu)=>(
                    matkulu.matkul.nama.toLowerCase().includes(search.toLowerCase()) ?
                    <ItemMatkulUjian key={matkulu.id} matkulujian={matkulu} allmatkulujian={matkulujian} setMatkulujian={changeData}/>
                    :
                    null
                ))
                }
                {search=="" && matkulujian.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah Ujian"}/>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Mata Kuliah Ujian</h1>
    //             <div className="d-flex flex-row align-items-center">
    //                 <div>
    //                     <button className="btn btn-dark my-1" onClick={AddMatkulUjian}>Tambah Mata Kuliah Ujian</button>
    //                 </div>
    //                 <div className="px-1">
    //                     <FormSelect onChange={handleChangeSemester}>
    //                         {semester.map((sem)=>(
    //                             sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //             </div>
    //             <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Semester</th>						
    //                             <th className="text-center">Mata Kuliah</th>
    //                             <th className="text-center">Dosen Pengajar</th>
    //                             <th className="text-center">Jumlah Peserta</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     {search=="" ? 
    //                     displayedMatkulUjian.map((matkulu)=>(
    //                         <ItemMatkulUjian key={matkulu.id} matkulujian={matkulu} allmatkulujian={matkulujian} setMatkulujian={changeData}/>
    //                     ))
    //                     :
    //                     matkulujian.map((matkulu)=>(
    //                         matkulu.matkul.nama.toLowerCase().includes(search.toLowerCase()) ?
    //                         <ItemMatkulUjian key={matkulu.id} matkulujian={matkulu} allmatkulujian={matkulujian} setMatkulujian={changeData}/>
    //                         :
    //                         null
    //                     ))
    //                     }
    //                 </table>
    //             </div>
    //             {search=="" && matkulujian.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div>

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah Ujian"}/>
    //     </>
    // )
}