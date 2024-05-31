"use client"
import ItemSemester from "./ItemSemester";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {addSemester, getActiveSemester, getSemester} from "../../actions/semester";
import ToastSuccessDelete from "../toast/SuccessDelete";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import AddSemesterConfirmationModal from "../modal/AddSemesterConfrimation";
import ToastSuccessAdd from "../toast/SuccessAdd";

export default function MainSemester(){
    const [isLoading,setLoading] = useState(true);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedSemester, setDisplayedSemester] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [nextSemester, setNextSemester] = useState("");
    const [modal,setModal] = useState(false);
    const [toastAdd,setToastAdd] = useState(false);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    const closeToastAdd = () => setToastAdd(false);
    const openToastAdd = () => setToastAdd(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getSemester();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedSemester(data.slice(0,10));
            setSemester(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setSemester(data);
        setDisplayedSemester(data.slice(0,10));
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
            setDisplayedSemester(semester.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedSemester(semester.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const countSem = async () => {
        const activeSemester = await getActiveSemester();
        let namaSemester = String(activeSemester?.semester);
        let ganjilGenap = String(namaSemester.substring(0,6));
        
        if(ganjilGenap.includes("Ganjil")){
            let tahunAjaran1 = Number(namaSemester.substring(7,11));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterBaru = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            setNextSemester(semesterBaru);
            openModal();
        }
        else if(ganjilGenap.includes("Genap")){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let tahunAjaran1Baru = tahunAjaran1+1;
            let tahunAjaran2Baru = tahunAjaran1Baru+1;
            let semesterBaru = "Ganjil "+String(tahunAjaran1Baru)+"/"+String(tahunAjaran2Baru);
            setNextSemester(semesterBaru);
            openModal();
        }
    }

    const addSem = async () => {
        const response = await addSemester(nextSemester);
        if(response){
            const data = await getSemester();
            setMaxPage(Math.ceil(data.length/10));
            setDisplayedSemester(data.slice(0,10));
            setSemester(data);
            closeModal();
            openToastAdd();
        }
        else{
            alert("gagal menambahkan semester");
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Semester</strong></h3>
                <button className="btn btn-dark my-1" onClick={countSem} style={{backgroundColor:"#272829"}}><strong>Tambah Semester</strong></button>
                <input className="form-control w-25 mb-1" placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Semester</strong>
                            </Col>
                            <Col>
                                <strong>Status</strong>
                            </Col>
                            <Col>
                                <strong>Action</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ?
                    displayedSemester.map((sem)=>(
                        <ItemSemester key={sem.id} sem={sem} semester={semester} setSemester={changeData}/>
                    ))
                    :
                    semester.map((sem)=>(
                        sem.semester.toLowerCase().includes(search.toLowerCase()) ?
                        <ItemSemester key={sem.id} sem={sem} semester={semester} setSemester={changeData}/>
                        :
                        null
                    ))
                }
                {search=="" && semester.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Semester"}/>
            <AddSemesterConfirmationModal modal={modal} closeModal={closeModal} onAction={addSem} semester={nextSemester}/>
            <ToastSuccessAdd toast={toastAdd} closeToast={closeToastAdd} page="Semester"/>
        </div>
    )
}