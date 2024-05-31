"use client"
import { useEffect, useState } from "react";
import {getUjianBySemester, getUjianRuanganDosen, getUjianSemesterGroupByDate} from "../../actions/ujian";
import LoadingPengguna from "../../admin/dosen/loading";
import {addKonsumsiDosen, getAllExamDate, getAllExamDateDosen, getAturanKonsumsi, getKonsumsi} from "../../actions/konsumsi"
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import ModalSuccessCountKonsumsi from "../modal/SuccessCountKonsumsi";
import LoadingPage from "../LoadingPage";
import ModalLoadingAddKonsumsi from "../modal/LoadingAddKonsumsi";
import ModalFailHitungKonsumsi from "../modal/FailHitungKonsumsi";

export default function HitungKonsumsi({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [modal, setModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [failModal, setFailModal] = useState(false);
    const [dataKonsumsi,setDataKonsumsi] = useState(undefined);

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const openModalLoading = () => setLoadingModal(true);
    const closeModalLoading = () => setLoadingModal(false);

    const openModalFail = () => setFailModal(true);
    const closeModalFail = () => setFailModal(false);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUjianBySemester(props.semester.id,"UTS");
            const semester = await getSemester();
            const arr = [];
            let index = 0;
            
            for(let i = 0;i<data.length;i++){
                if(i!=0){
                    const dateBefore = String(data[i-1].date).split(" ")[1]+" "+String(data[i-1].date).split(" ")[2]+" "+String(data[i-1].date).split(" ")[3];
                    const dateNow = String(data[i].date).split(" ")[1]+" "+String(data[i].date).split(" ")[2]+" "+String(data[i].date).split(" ")[3];
                    
                    if(dateBefore==dateNow){
                        arr[index].push(data[i]);
                    }
                    else{
                        index++;
                        arr.push([data[i]]);
                    }
                }
                else{
                    arr.push([data[i]]);
                }
            }

            setSelectedData({semester:props.semester.id,tipe:"UTS"});
            setSemester(semester);
            setUjian(arr);
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
        const data = await getUjianBySemester(e.target.value,tempData.tipe);
        const arr = [];
        let index = 0;
        
        for(let i = 0;i<data.length;i++){
            if(i!=0){
                const dateBefore = String(data[i-1].date).split(" ")[1]+" "+String(data[i-1].date).split(" ")[2]+" "+String(data[i-1].date).split(" ")[3];
                const dateNow = String(data[i].date).split(" ")[1]+" "+String(data[i].date).split(" ")[2]+" "+String(data[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    arr[index].push(data[i]);
                }
                else{
                    index++;
                    arr.push([data[i]]);
                }
            }
            else{
                arr.push([data[i]]);
            }
        }

        setUjian(arr);
        setSelectedData(tempData);
    }

    const onChangeTipe = async (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;
        const data = await getUjianBySemester(tempData.semester,e.target.value);
        console.log();
        const arr = [];
        let index = 0;
        
        for(let i = 0;i<data.length;i++){
            if(i!=0){
                const dateBefore = String(data[i-1].date).split(" ")[1]+" "+String(data[i-1].date).split(" ")[2]+" "+String(data[i-1].date).split(" ")[3];
                const dateNow = String(data[i].date).split(" ")[1]+" "+String(data[i].date).split(" ")[2]+" "+String(data[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    arr[index].push(data[i]);
                }
                else{
                    index++;
                    arr.push([data[i]]);
                }
            }
            else{
                arr.push([data[i]]);
            }
        }

        setUjian(arr);
        setSelectedData(tempData);
    }

    const countKonsumsi = async () => {
        try{
            openModalLoading();
            let fail = false;
            const aturan = await getAturanKonsumsi();
            const arrAturan = [];
            for(let i = 0;i<aturan.length;i++){//ambil dan masukin aturanya
                arrAturan.push({delapanSepuluh:aturan[i].delapanSepuluh,sepuluhDuaBelas:aturan[i].sepuluhDuaBelas,sebelasTigaBelas:aturan[i].sebelasTigaBelas,duaBelasDua:aturan[i].duaBelasDua,duaEmpat:aturan[i].duaEmpat});
            }
    
            for(let i = 0;i<ujian.length;i++){//loop buat semua ujian yang ada buat semester dan masa ujian tersebut
                const date = new Date(ujian[i][0].date).toISOString().substring(0,10);
                const ujianDate = await getAllExamDate(date);
                const arrDosen = [];//masukin semua dosen yang ada di ujian tersebut
                for(let j = 0;j<ujianDate.length;j++){
                    if(arrDosen.some(dosen=>dosen.id == ujianDate[j].idDosen)==false){
                        arrDosen.push(ujianDate[j].dosen);
                    }
                }
    
                for(let j = 0;j<arrDosen.length;j++){//loop untuk semua dosen yg ada
                    const dosen = await getAllExamDateDosen(date,arrDosen[j].id);//ambil semua ujian punya dosen terseut
                    let idUjianRuanganDosen = dosen[0].id;
                    for(let k = 0;k<dosen.length;k++){//klo ada dosen yang lebih dari 1 kali, klo udh pernah dihitung ambil yg udh ada konsumsinya
                        if(dosen[k].lunch!=0||dosen[k].snack!=0){
                            idUjianRuanganDosen = dosen[k].id;
                        }
                    }
                    let konsumsiDosen = {delapanSepuluh:false,sepuluhDuaBelas:false,sebelasTigaBelas:false,duaBelasDua:false,duaEmpat:false};
                    for(let k = 0;k<dosen.length;k++){
                        const mulai = new Date(dosen[k].ujian.mulai).toTimeString().substring(0,5);
                        const selesai = new Date(dosen[k].ujian.selesai).toTimeString().substring(0,5);
                        if(mulai=="08:00"&&selesai=="10:00"){
                            konsumsiDosen.delapanSepuluh = true;
                        }
                        if(mulai=="10:00"&&selesai=="12:00"){
                            konsumsiDosen.sepuluhDuaBelas = true;
                        }
                        if(mulai=="11:00"&&selesai=="13:00"){
                            konsumsiDosen.sebelasTigaBelas = true;
                        }
                        if(mulai=="12:00"&&selesai=="14:00"){
                            konsumsiDosen.duaBelasDua = true;
                        }
                        if(mulai=="14:00"&&selesai=="16:00"){
                            konsumsiDosen.duaEmpat = true;
                        }
                        if(mulai=="13:00"&&selesai=="15:00"){
                            konsumsiDosen.duaEmpat = true;
                        }
                    }
                    const index = arrAturan.findIndex(a=>a.delapanSepuluh==konsumsiDosen.delapanSepuluh&&a.sepuluhDuaBelas==konsumsiDosen.sepuluhDuaBelas&&
                        a.sebelasTigaBelas==konsumsiDosen.sebelasTigaBelas&&a.duaBelasDua==konsumsiDosen.duaBelasDua&&a.duaEmpat==konsumsiDosen.duaEmpat);
                    if(index==-1){
                        setDataKonsumsi(konsumsiDosen);
                        closeModalLoading();
                        openModalFail();
                        fail = true;
                        console.log(date);
                        break;
                    }
                    const snack = aturan[index].snack;
                    const lunch = aturan[index].lunch; 
                    await addKonsumsiDosen(idUjianRuanganDosen,snack,lunch);
                }
            }
            if(fail==false){
                closeModalLoading();
                openModal();
            }
        }
        catch(err){
            console.error("Gagal menghitung konsumsi ", err);
            //toast error
        }
    }

    if(isLoading){
        return <LoadingPage/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
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
                </div>
                <button className="btn mx-1" onClick={countKonsumsi} style={{backgroundColor:"#272829", color:"white"}}>Hitung Konsumsi</button>
            </div>

            <ModalSuccessCountKonsumsi modal={modal} closeModal={closeModal} semester={semester[semester.map(e=>e.id).indexOf(selectedData.semester)].semester} masaujian={selectedData.tipe.toString()}/>
            <ModalLoadingAddKonsumsi modal={loadingModal} closeModal={closeModalLoading}/>
            {dataKonsumsi!=undefined ? 
                <ModalFailHitungKonsumsi modal={failModal} closeModal={closeModalFail} dataKonsumsi={dataKonsumsi}/>
            :
                null
            }
        </>
    )
}