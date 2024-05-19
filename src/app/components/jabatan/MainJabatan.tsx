"use client"
import { useState, useEffect } from "react";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";
import { getJabatan } from "@/app/actions/jabatan";
import { useRouter } from "next/navigation";
import { Card, CardBody, CloseButton, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessDelete from "../toast/SuccessDelete";
import LoadingPage from "../LoadingPage";


export default function MainJabatan(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan, setJabatan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedJabatan, setDisplayedJabatan] = useState(new Object);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getJabatan();

                setMaxPage(Math.ceil(data.length/10));
                setDisplayedJabatan(data.slice(0,10));
                setJabatan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setJabatan(data);
        setDisplayedJabatan(data.slice(0,10));
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
            setDisplayedJabatan(jabatan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedJabatan(jabatan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const addJabatan = () => {
        router.push("/admin/jabatan/add");
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Jabatan</strong></h3>
                <button className="btn btn-dark my-1" onClick={addJabatan} style={{backgroundColor:"#272829"}}><strong>Tambah Jabatan</strong></button>
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
                                <strong>Kuota Mengawas</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ? 
                displayedJabatan.map((role)=>(
                    <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
                ))
                :
                jabatan.map((role)=>(
                    role.nama.toLowerCase().includes(search.toLowerCase()) ?
                    <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
                    :
                    null
                ))
                }
                {search=="" && jabatan.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Jabatan"}/>
        </div>
    )

    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Jabatan</h1>
    //             <button className="btn btn-dark my-1" onClick={addJabatan}>Tambah Jabatan</button>
    //             <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle" style={{borderCollapse:"separate", borderSpacing:"0 5px"}}>
    //                     <thead className="table-dark">
    //                         <tr>
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama</th>						
    //                             <th className="text-center">Kouta Mengawas</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
    //                         </tr>
    //                     </thead>
    //                     {search=="" ? 
    //                     displayedJabatan.map((role)=>(
    //                         <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
    //                     ))
    //                     :
    //                     jabatan.map((role)=>(
    //                         role.nama.toLowerCase().includes(search.toLowerCase()) ?
    //                         <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
    //                         :
    //                         null
    //                     ))
    //                     }
    //                 </table>
    //             </div>
    //             {search=="" && jabatan.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div> 

    //         <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Jabatan"}/>
    //     </>
    // )
}