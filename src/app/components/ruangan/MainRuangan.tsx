"use client"
import { useState, useEffect } from "react";
import { getRuangan } from "@/app/actions/ruangan";
import { useRouter } from "next/navigation";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemRuangan from "./ItemRuangan";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { addSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";


export default function MainRuangan(){
    const [isLoading,setLoading] = useState(true);
    const [ruangan, setRuangan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedRuangan, setDisplayedRuangan] = useState(new Object);
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
                const data = await getRuangan();

                setMaxPage(Math.ceil(data.length/10));
                setDisplayedRuangan(data.slice(0,10));
                setRuangan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setRuangan(data);
        setDisplayedRuangan(data.slice(0,10));
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
            setDisplayedRuangan(ruangan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedRuangan(ruangan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const addRuangan = () => {
        router.push("/admin/ruangan/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Ruangan</strong></h3>
                <button className="btn btn-dark my-1" onClick={addRuangan} style={{backgroundColor:"#272829"}}><strong>Tambah Ruangan</strong></button>
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
                                <strong>Kapasitas</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ?
                    displayedRuangan.map((classroom)=>(
                        <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
                    ))
                    :
                    ruangan.map((classroom)=>(
                        classroom.nama.toLowerCase().includes(search.toLowerCase()) ? 
                        <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
                        :
                        null
                    ))
                }
                {search=="" && ruangan.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ruangan"}/>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Ruangan</h1>
    //             <button className="btn btn-dark my-1" onClick={addRuangan}>Tambah Ruangan</button>
    //             <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th className="text-center">Nama</th>						
    //                             <th className="text-center">Kapasitas</th>
    //                             <th className="text-center">Action</th>
    //                         </tr>
    //                     </thead>
    //                     {search=="" ?
    //                     displayedRuangan.map((classroom)=>(
    //                         <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
    //                     ))
    //                     :
    //                     ruangan.map((classroom)=>(
    //                         classroom.nama.toLowerCase().includes(search.toLowerCase()) ? 
    //                         <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
    //                         :
    //                         null
    //                     ))
    //                     }
    //                 </table>
    //             </div>
    //             {search=="" && ruangan.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div> 

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ruangan"}/>
    //     </>
    // )
}