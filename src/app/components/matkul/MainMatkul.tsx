"use client"
import ItemSemester from "./ItemMatkul";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getMatkul} from "../../actions/matkul";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";

export default function MainMatkul(){
    const [isLoading,setLoading] = useState(true);
    const [matkul, setMatkul] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedMatkul, setDisplayedMatkul] = useState(new Object);
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
            const data = await getMatkul();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedMatkul(data.slice(0,10));
            setMatkul(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setMatkul(data);
        setDisplayedMatkul(data.slice(0,10));
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
            setDisplayedMatkul(matkul.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedMatkul(matkul.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const addMatkul = () => {
        router.push("/admin/matkul/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Mata Kuliah</strong></h3>
                <button className="btn btn-dark my-1" onClick={addMatkul} style={{backgroundColor:"#272829"}}><strong>Tambah Mata Kuliah</strong></button>
                <input className="form-control w-25 mb-1" placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Kode</strong>
                            </Col>
                            <Col>
                                <strong>Nama</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ?
                    displayedMatkul.map((matakuliah)=>(
                        <ItemSemester key={matakuliah.id} matakuliah={matakuliah} matkul={matkul} setMatkul={changeData}/>
                    ))
                    :
                    matkul.map((matakuliah)=>(
                        matakuliah.nama.toLowerCase().includes(search.toLowerCase()) ?
                        <ItemSemester key={matakuliah.id} matakuliah={matakuliah} matkul={matkul} setMatkul={changeData}/>
                        :
                        null
                    ))
                }
                {search=="" && matkul.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah"}/>
        </div>
    )
    
    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Mata Kuliah</h1>
    //             <button className="btn btn-dark my-1" onClick={addMatkul}>Tambah Mata Kuliah</button>
    //             <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Kode</th>						
    //                             <th className="text-center">Nama</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     {search=="" ?
    //                     displayedMatkul.map((matakuliah)=>(
    //                         <ItemSemester key={matakuliah.id} matakuliah={matakuliah} matkul={matkul} setMatkul={changeData}/>
    //                     ))
    //                     :
    //                     matkul.map((matakuliah)=>(
    //                         matakuliah.nama.toLowerCase().includes(search.toLowerCase()) ?
    //                         <ItemSemester key={matakuliah.id} matakuliah={matakuliah} matkul={matkul} setMatkul={changeData}/>
    //                         :
    //                         null
    //                     ))
    //                     }
    //                 </table>
    //             </div>
    //             {search=="" && matkul.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div>

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Mata Kuliah"}/>
    //     </>
    // )
}