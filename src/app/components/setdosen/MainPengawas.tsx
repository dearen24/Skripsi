"use client"

import { useEffect, useState } from "react";
import {addPengawasUjian, getUjian, getUjianBySemester} from "../../actions/ujian"
import LoadingPengguna from "../../admin/dosen/loading";
import { Card, CardBody, Col, Form, Row } from "react-bootstrap";
import { getUser } from "@/app/actions/user";
import Image from "next/image";
import { getSemester, getSemesterById, getSemesterByNama } from "@/app/actions/semester";
import ItemPengawas from "./ItemPengawas";
import ToastSuccessEdit from "../toast/SuccessEdit";
import LoadingPage from "../LoadingPage";
import { getRekapMengawas } from "@/app/actions/rekapmengawas";

export default function MainPengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [dosen, setDosen] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData,setSelectedData] = useState(new Object);
    const [hiddenAndDisabled, setHiddenAndDisabled] = useState(true);
    const [date, setDate] = useState(new Object);
    const [toast, setToast] = useState(false);
    const [namaSemester,setNamaSemester] = useState();

    const openToast = () => setToast(true);
    const closeToast = () => setToast(false);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const ujian = await getUjianBySemester(props.semester.id,"UTS");
            const dosen = await getUser();
            const semester = await getSemester();
            const semesterSelected = await getSemesterById(props.semester.id);
            let namaSemester = String(semesterSelected?.semester);
            let ganjilGenap = String(namaSemester.substring(0,6));
            let rekapMengawasSebelumnya = [];

            if(ganjilGenap.includes("Ganjil")){
                let tahunAjaran1 = Number(namaSemester.substring(7,11))-1;
                let tahunAjaran2 = tahunAjaran1+1;
                let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
                const lastSemester = await getSemesterByNama(semesterSebelumnya);
                if(lastSemester!=null){
                    rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
                }
            }
            else if(ganjilGenap.includes("Genap")){
                let tahunAjaran1 = Number(namaSemester.substring(6,10));
                let tahunAjaran2 = tahunAjaran1+1;
                let semesterSebelumnya = "Ganjil "+String(Number(tahunAjaran1))+"/"+String(Number(tahunAjaran2));
                const lastSemester = await getSemesterByNama(semesterSebelumnya);
                if(lastSemester!=null){
                    rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
                }
            }

            if(rekapMengawasSebelumnya.length!=0){
                for(let i = 0;i<dosenTemp.length;i++){
                    const index = rekapMengawasSebelumnya.findIndex(a=>a.idDosen==dosenTemp[i].id);
                    if(index!=-1){
                        dosenTemp[i].role.kuotaMengawas = rekapMengawasSebelumnya[index].kuotaSelanjutnya;
                    }
                }
            }
            
            for(let i = 0;i<ujian.length;i++){
                ujian[i].ruangandosen = [];
                for(let j = 0;j<ujian[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                    if(ujian[i].ruangandosen.length==0){
                        ujian[i].ruangandosen.push(ujian[i].ujian[j].ruangan);
                    }
                    else{
                        if(ujian[i].ruangandosen.some(ruangan=>ruangan.id == ujian[i].ujian[j].ruangan?.id)==false){
                            ujian[i].ruangandosen.push(ujian[i].ujian[j].ruangan);
                        }
                    }
                }

                for(let j = 0;j<ujian[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                    ujian[i].ruangandosen[j].dosen = [];
                }

                for(let j = 0;j<ujian[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                    const idRuanganNow = ujian[i].ujian[j].ruangan?.id;
                    for(let k = 0;k<ujian[i].ruangandosen.length;k++){
                        if(idRuanganNow==ujian[i].ruangandosen[k].id&&ujian[i].ujian[j].dosen!=null){
                            ujian[i].ruangandosen[k].dosen.push({id:ujian[i].ujian[j].dosen.id});
                        }
                    }    
                }

                for(let j = 0;j<ujian[i].ruangandosen.length;j++){
                    for(let k = 0;k<ujian[i].ruangandosen[j].dosen.length;k++){
                        const indexDosen = dosen.findIndex(x=>x.id==ujian[i].ruangandosen[j].dosen[k].id);
                        dosen[indexDosen].role.kuotaMengawas--;
                    }
                }
            }

            const ujianDate = [];

            for(let i = 0;i<ujian.length;i++){
                if(i!=0){
                    const dateBefore = String(ujian[i-1].date).split(" ")[1]+" "+String(ujian[i-1].date).split(" ")[2]+" "+String(ujian[i-1].date).split(" ")[3];
                    const dateNow = String(ujian[i].date).split(" ")[1]+" "+String(ujian[i].date).split(" ")[2]+" "+String(ujian[i].date).split(" ")[3];
                    
                    if(dateBefore!=dateNow){
                        ujianDate.push(ujian[i].date);    
                    }
                }
                else{
                    ujianDate.push(ujian[i].date);
                }
            }

            setNamaSemester(props.semester.semester);
            setSelectedData({date:ujianDate[0].toISOString(),tipe:"UTS",semester:props.semester.id});
            setDate(ujianDate);
            setSemester(semester);
            setUjian(ujian)
            setDosen(dosen);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const handleChangePengawas = (idNow,idBefore,hapus,indexUjian,indexRuanganDosen) => {
        const dataDosenTemp = [...dosen];
        const dataUjianTemp = [...ujian];

        if(hapus==false){
            const indexSelected = dataDosenTemp.findIndex(x => x.id == idNow);
            if(idBefore!=""){
                for(let i = 0;i<dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen.length;i++){
                    if(idBefore==dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen[i].id){
                        dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen[i].id = idNow;
                    }
                }
                const indexBefore = dataDosenTemp.findIndex(x => x.id == idBefore);
                dataDosenTemp[indexBefore].role.kuotaMengawas++;
            }
            else{
                dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen.push({id:idNow});
            }
            dataDosenTemp[indexSelected].role.kuotaMengawas--;
        }
        else{
            for(let i = 0;i<dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen.length;i++){
                if(idBefore==dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen[i].id){
                    dataUjianTemp[indexUjian].ruangandosen[indexRuanganDosen].dosen.splice(i,1);
                }
            }
            const indexBefore = dataDosenTemp.findIndex(x => x.id == idBefore);
            dataDosenTemp[indexBefore].role.kuotaMengawas++;
        }
        setDosen(dataDosenTemp);
    }

    const edit = async () => {
        await addPengawasUjian(ujian);
        openToast();
        setHiddenAndDisabled(true);
    }

    const onClickEdit = () => {
        if(hiddenAndDisabled){
            setHiddenAndDisabled(false);
        }
        else{
            setHiddenAndDisabled(true);
        }
    }

    const handleChangeSemester = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.semester = e.target.value;
        const dosenTemp = await getUser();
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const semesterSelected = await getSemesterById(e.target.value);
        let namaSemester = String(semesterSelected?.semester);
        let ganjilGenap = String(namaSemester.substring(0,6));
        let rekapMengawasSebelumnya = [];

        if(ganjilGenap.includes("Ganjil")&&dataTemp.tipe=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11))-1;
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Ganjil")&&dataTemp.tipe=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&dataTemp.tipe=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(Number(tahunAjaran1))+"/"+String(Number(tahunAjaran2));
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&dataTemp.tipe=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }

        if(rekapMengawasSebelumnya.length!=0){
            for(let i = 0;i<dosenTemp.length;i++){
                const index = rekapMengawasSebelumnya.findIndex(a=>a.idDosen==dosenTemp[i].id);
                if(index!=-1){
                    dosenTemp[i].role.kuotaMengawas = rekapMengawasSebelumnya[index].kuotaSelanjutnya;
                }
            }
        }

        for(let i = 0;i<ujianTemp.length;i++){
            ujianTemp[i].ruangandosen = [];
            for(let j = 0;j<ujianTemp[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                if(ujianTemp[i].ruangandosen.length==0){
                    ujianTemp[i].ruangandosen.push(ujianTemp[i].ujian[j].ruangan);
                }
                else{
                    if(ujianTemp[i].ruangandosen.some(ruangan=>ruangan.id == ujianTemp[i].ujian[j].ruangan?.id)==false){
                        ujianTemp[i].ruangandosen.push(ujianTemp[i].ujian[j].ruangan);
                    }
                }
            }

            for(let j = 0;j<ujianTemp[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                ujianTemp[i].ruangandosen[j].dosen = [];
            }

            for(let j = 0;j<ujianTemp[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                const idRuanganNow = ujianTemp[i].ujian[j].ruangan?.id;
                for(let k = 0;k<ujianTemp[i].ruangandosen.length;k++){
                    if(idRuanganNow==ujianTemp[i].ruangandosen[k].id&&ujianTemp[i].ujian[j].dosen!=null){
                        ujianTemp[i].ruangandosen[k].dosen.push({id:ujianTemp[i].ujian[j].dosen.id});
                    }
                }    
            }

            for(let j = 0;j<ujianTemp[i].ruangandosen.length;j++){
                for(let k = 0;k<ujianTemp[i].ruangandosen[j].dosen.length;k++){
                    const indexDosen = dosenTemp.findIndex(x=>x.id==ujianTemp[i].ruangandosen[j].dosen[k].id);
                    dosenTemp[indexDosen].role.kuotaMengawas--;
                }
            }
        }

        const ujianDate = [];

        for(let i = 0;i<ujianTemp.length;i++){
            if(i!=0){
                const dateBefore = String(ujianTemp[i-1].date).split(" ")[1]+" "+String(ujianTemp[i-1].date).split(" ")[2]+" "+String(ujianTemp[i-1].date).split(" ")[3];
                const dateNow = String(ujianTemp[i].date).split(" ")[1]+" "+String(ujianTemp[i].date).split(" ")[2]+" "+String(ujianTemp[i].date).split(" ")[3];
                
                if(dateBefore!=dateNow){
                    ujianDate.push(ujianTemp[i].date);    
                }
            }
            else{
                ujianDate.push(ujianTemp[i].date);
            }
        }

        if(ujianDate.length!=0){
            dataTemp.date = ujianDate[0].toISOString();
        }
        
        setNamaSemester(semesterSelected.semester);
        setSelectedData(dataTemp);
        setDate(ujianDate);
        setDosen(dosenTemp);
        setUjian(ujianTemp);
    }

    const handleChangeTipe = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.tipe = e.target.value;
        const dosenTemp = await getUser();
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const semesterSelected = await getSemesterById(e.target.value);
        let namaSemester = String(semesterSelected?.semester);
        let ganjilGenap = String(namaSemester.substring(0,6));
        let rekapMengawasSebelumnya = [];

        if(ganjilGenap.includes("Ganjil")&&dataTemp.tipe=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11))-1;
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Ganjil")&&dataTemp.tipe=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&dataTemp.tipe=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(Number(tahunAjaran1))+"/"+String(Number(tahunAjaran2));
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&dataTemp.tipe=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await getSemesterByNama(semesterSebelumnya);
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }

        if(rekapMengawasSebelumnya.length!=0){
            for(let i = 0;i<dosenTemp.length;i++){
                const index = rekapMengawasSebelumnya.findIndex(a=>a.idDosen==dosenTemp[i].id);
                if(index!=-1){
                    dosenTemp[i].role.kuotaMengawas = rekapMengawasSebelumnya[index].kuotaSelanjutnya;
                }
            }
        }

        for(let i = 0;i<ujianTemp.length;i++){
            ujianTemp[i].ruangandosen = [];
            for(let j = 0;j<ujianTemp[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                if(ujianTemp[i].ruangandosen.length==0){
                    ujianTemp[i].ruangandosen.push(ujianTemp[i].ujian[j].ruangan);
                }
                else{
                    if(ujianTemp[i].ruangandosen.some(ruangan=>ruangan.id == ujianTemp[i].ujian[j].ruangan?.id)==false){
                        ujianTemp[i].ruangandosen.push(ujianTemp[i].ujian[j].ruangan);
                    }
                }
            }

            for(let j = 0;j<ujianTemp[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                ujianTemp[i].ruangandosen[j].dosen = [];
            }

            for(let j = 0;j<ujianTemp[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                const idRuanganNow = ujianTemp[i].ujian[j].ruangan?.id;
                for(let k = 0;k<ujianTemp[i].ruangandosen.length;k++){
                    if(idRuanganNow==ujianTemp[i].ruangandosen[k].id&&ujianTemp[i].ujian[j].dosen!=null){
                        ujianTemp[i].ruangandosen[k].dosen.push({id:ujianTemp[i].ujian[j].dosen.id});
                    }
                }    
            }

            for(let j = 0;j<ujianTemp[i].ruangandosen.length;j++){
                for(let k = 0;k<ujianTemp[i].ruangandosen[j].dosen.length;k++){
                    const indexDosen = dosenTemp.findIndex(x=>x.id==ujianTemp[i].ruangandosen[j].dosen[k].id);
                    dosenTemp[indexDosen].role.kuotaMengawas--;
                }
            }
        }

        const ujianDate = [];

        for(let i = 0;i<ujianTemp.length;i++){
            if(i!=0){
                const dateBefore = String(ujianTemp[i-1].date).split(" ")[1]+" "+String(ujianTemp[i-1].date).split(" ")[2]+" "+String(ujianTemp[i-1].date).split(" ")[3];
                const dateNow = String(ujianTemp[i].date).split(" ")[1]+" "+String(ujianTemp[i].date).split(" ")[2]+" "+String(ujianTemp[i].date).split(" ")[3];
                
                if(dateBefore!=dateNow){
                    ujianDate.push(ujianTemp[i].date);    
                }
            }
            else{
                ujianDate.push(ujianTemp[i].date);
            }
        }

        if(ujianDate.length!=0){
            dataTemp.date = ujianDate[0].toISOString();
        }

        setSelectedData(dataTemp);
        setDate(ujianDate);
        setDosen(dosenTemp);
        setUjian(ujianTemp);
    }

    const handleChangeDate = (e) => {
        const tempData = {...selectedData};
        tempData.date = e.target.value;
        setSelectedData(tempData);
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <div className="d-flex flex-column w-100 h-100">
            <div className="upper mx-1">
                <h3><strong>Pengawas Ujian</strong></h3>
            </div>
            <div className="d-flex flex-row mb-1">
                <div className="dropdown mx-1">
                    <Form.Select onChange={handleChangeSemester} aria-label="Semester" style={{border:"2px solid black"}}>
                        {semester.map((sem)=>(
                        sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                    ))}
                    </Form.Select>
                </div>
                <div className="dropdown">
                    <Form.Select onChange={handleChangeTipe} aria-label="Masa Ujian" style={{border:"2px solid black"}}>
                        <option value="UTS" selected>UTS</option>
                        <option value="UAS">UAS</option>
                        <option value="Pendek">Pendek</option>
                    </Form.Select>
                </div>
                <div className="mx-1">
                    <Form.Select onChange={handleChangeDate} style={{border:"2px solid black"}}>
                        {date.map((d)=>(
                            d.toISOString()==selectedData.date ?
                            <option value={d.toISOString()} selected>{d.toDateString().split(" ")[0]+", "+d.toDateString().split(" ")[2]+" "+d.toDateString().split(" ")[1]+" "+d.toDateString().split(" ")[3]}</option>
                            :
                            <option value={d.toISOString()}>{d.toDateString().split(" ")[0]+", "+d.toDateString().split(" ")[2]+" "+d.toDateString().split(" ")[1]+" "+d.toDateString().split(" ")[3]}</option>
                        ))}
                    </Form.Select>
                </div>
                <div>
                    <button className="btn" onClick={onClickEdit} style={{backgroundColor:"#272829", color:"white"}}>Edit</button>
                </div>
            </div>
            <div className="content mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Waktu</strong>
                            </Col>
                            <Col>
                                <strong>Metode</strong>
                            </Col>
                            <Col sm="1">
                                <strong>Shift</strong>
                            </Col>
                            <Col>
                                <strong>Ruangan</strong>
                            </Col>
                            <Col>
                                <strong>Mata Kuliah</strong>
                            </Col>
                            <Col>
                                <strong>Dosen Pengajar</strong>
                            </Col>
                            <Col sm="3">
                                <strong>Pengawas</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {ujian.map((u,indexUjian)=>(
                    u.date.toISOString()==selectedData.date ?
                    u.ruangandosen.map((ruangandosen,indexRuanganDosen)=>(
                        <ItemPengawas key={u.id+""+ruangandosen.id} ujian={u} ruangandosen={ruangandosen} indexUjian={indexUjian} indexRuanganDosen={indexRuanganDosen} dosen={dosen} handleChange={handleChangePengawas} hiddenAndDisabled={hiddenAndDisabled} hidden={false}/>
                    ))
                    :
                    null
                ))}
            </div>
            <button type="submit" className="btn btn-warning my-2 mx-1" style={{border:"2px solid black"}} onClick={edit} hidden={hiddenAndDisabled}>
                <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                Simpan Perubahan
            </button> 
            <ToastSuccessEdit toast={toast} closeToast={closeToast} />
        </div>
    )
    
    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Pengawas Ujian</h1>
    //             <div className="table-wrapper">
    //                 <div className="d-flex flex-row">
    //                     <div className="dropdown">
    //                         <Form.Select onChange={handleChangeSemester} aria-label="Semester">
    //                             {semester.map((sem)=>(
    //                                 sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
    //                             ))}
    //                         </Form.Select>
    //                     </div>
    //                     <div className="dropdown mx-1">
    //                         <Form.Select onChange={handleChangeTipe} aria-label="Masa Ujian">
    //                             <option selected>UTS</option>
    //                             <option>UAS</option>
    //                         </Form.Select>
    //                     </div>
    //                     <div className="">
    //                         <Form.Select onChange={handleChangeDate}>
    //                             {date.map((d)=>(
    //                                 d.toISOString()==selectedData.date ?
    //                                 <option value={d.toISOString()} selected>{d.toDateString().split(" ")[0]+", "+d.toDateString().split(" ")[2]+" "+d.toDateString().split(" ")[1]+" "+d.toDateString().split(" ")[3]}</option>
    //                                 :
    //                                 <option value={d.toISOString()}>{d.toDateString().split(" ")[0]+", "+d.toDateString().split(" ")[2]+" "+d.toDateString().split(" ")[1]+" "+d.toDateString().split(" ")[3]}</option>
    //                             ))}
    //                         </Form.Select>
    //                     </div>
    //                     <div>
    //                         <button className="btn btn-primary" onClick={onClickEdit}>Edit</button>
    //                     </div>
    //                 </div>
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Tanggal</th>						
    //                             <th className="text-center">Waktu Mulai</th>
    //                             <th className="text-center">Waktu Selesai</th>
    //                             <th className="text-center">Tipe Ujian</th>
    //                             <th className="text-center">Shift</th>
    //                             <th className="text-center">Ruangan</th>
    //                             <th className="text-center">Mata Kuliah</th>
    //                             <th className="text-center">Dosen Pengajar</th>
    //                             <th className="text-center">Pengawas</th>
    //                             <th className="text-center" style={{borderTopRightRadius:'6px'}}>Tambah Pengawas</th>
    //                         </tr>
    //                     </thead>
    //                     {ujian.map((u,indexUjian)=>(
    //                         u.date.toISOString()==selectedData.date ?
    //                         u.ruangandosen.map((ruangandosen,indexRuanganDosen)=>(
    //                             <ItemPengawas key={u.id+""+ruangandosen.id} ujian={u} ruangandosen={ruangandosen} indexUjian={indexUjian} indexRuanganDosen={indexRuanganDosen} dosen={dosen} handleChange={handleChangePengawas} hiddenAndDisabled={hiddenAndDisabled} hidden={false}/>
    //                         ))
    //                         :
    //                         null
    //                     ))}
    //                 </table>
    //             </div> 
    //             <button type="submit" className="btn btn-warning w-100 my-2" onClick={edit} hidden={hiddenAndDisabled}>
    //                 <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
    //                 Simpan Perubahan
    //             </button> 
    //         </div>

    //         <ToastSuccessEdit toast={toast} closeToast={closeToast} />
    //     </>
    // )
}