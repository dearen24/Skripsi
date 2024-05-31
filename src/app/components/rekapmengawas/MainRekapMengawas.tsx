"use client"
import { useEffect, useState } from "react";
import { createRekapMengawas, getRekapMengawas } from "../../actions/rekapmengawas";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import ItemRekapMengawas from "./ItemRekapMengawas";
import LoadingPage from "../LoadingPage";
import { getUser } from "@/app/actions/user";
import SubmitRekapMengawasConfirmationModal from "../modal/SubmitRekapMengawasConfirmation";
import ToastSuccessMakeSubmitRekapMengawas from "../toast/SuccessSubmitRekapMengawas";
import PDFRekapMengawas from "../pdf/PDFRekapMengawas";
import { usePDF } from "react-to-pdf";
import generatePDF from "../pdf/PDFRekapMengawas";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFRekapMengawasTest from "../pdf/PDFRekapMengawasTest";
import ModalFailSubmitRekapMengawas from "../modal/FailSubmitRekapMengawas";

export default function MainRekapMengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [rekap, setRekap] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [user,setUser] = useState(new Object);
    const [search, setSearch] = useState("");
    const [displayedRekap, setDisplayedRekap] = useState(new Object);
    const [modal,setModal] = useState(false);
    const [modalFail,setModalFail] = useState(false);
    const [toast,setToast] = useState(false);
    const [namaSemester,setNamaSemester] = useState("");
    const router = useRouter();

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);
    const openModalFail = () => setModalFail(true);
    const closeModalFail = () => setModalFail(false);
    const openToast = () => setToast(true);
    const closeToast = () => setToast(false);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const semester = await getSemester();
            const rekap = await getRekapMengawas(props.semester.id,"UTS");
            const user = await getUser();
            const arrRekap = [];

            for(let i = 0;i<rekap.length;i++){
                const index = user.findIndex(a=>a.id==rekap[i].idDosen);
                const userObj = user[index];
                if(index!=-1){
                    userObj.kuotaMengawas = rekap[i].kuota;
                    userObj.jumlahMengawas = rekap[i].jumlahMengawas;
                    userObj.sisaMengawas = rekap[i].sisaMengawas;
                    userObj.kuotaSelanjutnya = rekap[i].kuotaSelanjutnya;
                    arrRekap.push(userObj);
                }
            }

            setNamaSemester(props.semester.semester);
            setUser(user);
            setSelectedData({tipe:"UTS",semester:props.semester.id});
            setMaxPage(Math.ceil(arrRekap.length/10));
            setDisplayedRekap(arrRekap.slice(0,10));
            setSemester(semester);
            setRekap(arrRekap);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const onChangeSemester = async (e) => {
        const tempData = {...selectedData};
        tempData.semester = e.target.value;

        const rekapTemp = await getRekapMengawas(e.target.value,tempData.tipe);
        
        const arrRekap = [];

        for(let i = 0;i<rekapTemp.length;i++){
            const index = user.findIndex(a=>a.id==rekapTemp[i].idDosen);
            const userObj = user[index];
            if(index!=-1){
                userObj.kuotaMengawas = rekapTemp[i].kuota;
                userObj.jumlahMengawas = rekapTemp[i].jumlahMengawas;
                userObj.sisaMengawas = rekapTemp[i].sisaMengawas;
                userObj.kuotaSelanjutnya = rekapTemp[i].kuotaSelanjutnya;
                arrRekap.push(userObj);
            }
        }
        if(rekapTemp.length!=0){
            setNamaSemester(rekapTemp[0].semester.semester);
        }
        setRekap(arrRekap);
        setMaxPage(Math.ceil(arrRekap.length/10));
        setDisplayedRekap(arrRekap.slice(0,10));
        setSelectedData(tempData);
    }

    const onChangeTipe = async (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;

        const rekapTemp = await getRekapMengawas(tempData.semester,e.target.value);
        
        const arrRekap = [];

        for(let i = 0;i<rekapTemp.length;i++){
            const index = user.findIndex(a=>a.id==rekapTemp[i].idDosen);
            const userObj = user[index];
            if(index!=-1){
                userObj.kuotaMengawas = rekapTemp[i].kuota;
                userObj.jumlahMengawas = rekapTemp[i].jumlahMengawas;
                userObj.sisaMengawas = rekapTemp[i].sisaMengawas;
                userObj.kuotaSelanjutnya = rekapTemp[i].kuotaSelanjutnya;
                arrRekap.push(userObj);
            }
        }
        setRekap(arrRekap);
        setMaxPage(Math.ceil(arrRekap.length/10));
        setDisplayedRekap(arrRekap.slice(0,10));
        setSelectedData(tempData);
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedRekap(rekap.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const printRekapMengawas = () => {
       router.push("/admin/rekapmengawas/"+selectedData.semester+"/"+selectedData.tipe);
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedRekap(rekap.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const addRekap = async () => {
        const rekapNow = await getRekapMengawas(selectedData.semester,selectedData.tipe);
        if(rekapNow.length==0){
            const response = await createRekapMengawas(selectedData.semester,selectedData.tipe);
            if(response){
                closeModal();
                openToast();
            }
            else{
                alert("Gagal mengupulkan rekap mengawas");
            }
        }
        else{
            closeModal();
            openModalFail();
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Rekap Mengawas</strong></h3>
            </div>
            <div className="d-flex flex-row py-1 px-1">
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
                        <option value="Pendek">Pendek</option>
                    </FormSelect>
                </div>
                <button className="btn btn-dark" onClick={openModal} style={{backgroundColor:"#272829"}}><strong>Masukan Rekap</strong></button>
                <PDFDownloadLink document={<PDFRekapMengawasTest rekap={rekap} masaujian={selectedData.tipe} semester={namaSemester}/>} fileName="Rekap Mengawas">
                    {({loading})=> 
                        loading ? (
                            <button className="btn btn-dark mx-1 h-100" style={{backgroundColor:"#272829"}} disabled><strong>Loading...</strong></button>
                        ) : (
                            <button className="btn btn-dark mx-1 h-100" style={{backgroundColor:"#272829"}}><strong>Cetak Rekap</strong></button>
                        )
                    }
                </PDFDownloadLink>
                {/* <button className="btn btn-dark mx-1" onClick={printRekapMengawas} style={{backgroundColor:"#272829"}}><strong>Cetak Rekap Mengawas</strong></button> */}
            </div>
            <input className="form-control w-25 mx-1 mb-1" placeholder="Search" onChange={changeSearch} style={{border:"2px solid black"}}/>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Nama Dosen</strong>
                            </Col>
                            <Col>
                                <strong>Kuota Mengawas</strong>
                            </Col>
                            <Col>
                                <strong>Total Mengawas</strong>
                            </Col>
                            <Col>
                                <strong>Sisa Mengawas</strong>
                            </Col>
                            <Col>
                                <strong>Kuota Mengawas Selanjutnya</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {search=="" ?
                displayedRekap.map((rek)=>(
                    <ItemRekapMengawas rekap={rek}/>
                ))
                :
                rekap.map((rek)=>(
                    rek.nama.toLowerCase().includes(search.toLowerCase()) ?
                    <ItemRekapMengawas rekap={rek}/>
                    :
                    null
                ))
                }
                {search=="" && rekap.length > 10 ? 
                <div>
                    <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
                    <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
                </div>
                :
                null
                }
            </div>
            <ToastSuccessMakeSubmitRekapMengawas toast={toast} closeToast={closeToast}/>
            <ModalFailSubmitRekapMengawas modal={modalFail} closeModal={closeModalFail}/>
            {rekap!=null ?
                <SubmitRekapMengawasConfirmationModal modal={modal} closeModal={closeModal} onAction={addRekap} semester={namaSemester} masaujian={selectedData.tipe}/>
            :
                null
            }
        </div>
    )
}
