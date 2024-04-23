"use client"

import { useEffect, useState } from "react";
import {addPengawasUjian, getUjian, getUjianBySemester} from "../../actions/ujian"
import LoadingPengguna from "../../admin/dosen/loading";
import { Form } from "react-bootstrap";
import { getUser } from "@/app/actions/user";
import Image from "next/image";
import { getSemester } from "@/app/actions/semester";
import ItemPengawas from "./ItemPengawas";

export default function MainPengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [dosen, setDosen] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData,setSelectedData] = useState({semester:props.semester.id,tipe:"UTS"});
    const [hiddenAndDisabled, setHiddenAndDisabled] = useState(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const ujian = await getUjianBySemester(selectedData.semester,selectedData.tipe);
            // const ujian = await getUjian();
            const dosen = await getUser();
            const semester = await getSemester();
            
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
        setSelectedData(dataTemp);
        const dosenTemp = await getUser();
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);

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

        setDosen(dosenTemp);
        setUjian(ujianTemp);
    }

    const handleChangeTipe = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.tipe = e.target.value;
        setSelectedData(dataTemp);
        const dosenTemp = await getUser();
        const ujianTemp = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);

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

        setDosen(dosenTemp);
        setUjian(ujianTemp);
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengawas Ujian</h1>
                <div className="table-wrapper">
                    <div className="d-flex flex-row">
                        <div className="dropdown">
                            <Form.Select onChange={handleChangeSemester} aria-label="Semester">
                                {semester.map((sem)=>(
                                    sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="dropdown mx-1">
                            <Form.Select onChange={handleChangeTipe} aria-label="Masa Ujian">
                                <option selected>UTS</option>
                                <option>UAS</option>
                            </Form.Select>
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={onClickEdit}>Edit</button>
                        </div>
                    </div>
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Tanggal</th>						
                                <th className="text-center">Waktu Mulai</th>
                                <th className="text-center">Waktu Selesai</th>
                                <th className="text-center">Tipe Ujian</th>
                                <th className="text-center">Metode Ujian</th>
                                <th className="text-center">Shift</th>
                                <th className="text-center">Ruangan</th>
                                <th className="text-center">Mata Kuliah</th>
                                <th className="text-center">Pengawas</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Tambah Pengawas</th>
                            </tr>
                        </thead>
                        {/* {ujian.map((u,indexUjian)=>(
                            u.ruangandosen.map((ruangandosen,indexRuanganDosen)=>(
                                u.semester.id==selectedData.semester&&u.tipe==selectedData.tipe ? 
                                <ItemPengawas key={indexUjian+""+indexRuanganDosen} ujian={u} ruangandosen={ruangandosen} indexUjian={indexUjian} indexRuanganDosen={indexRuanganDosen} dosen={dosen} handleChange={handleChangePengawas} hiddenAndDisabled={hiddenAndDisabled} hidden={false}/>
                                :
                                <ItemPengawas key={indexUjian+""+indexRuanganDosen} ujian={u} ruangandosen={ruangandosen} indexUjian={indexUjian} indexRuanganDosen={indexRuanganDosen} dosen={dosen} handleChange={handleChangePengawas} hiddenAndDisabled={hiddenAndDisabled} hidden={true}/>
                            ))
                        ))} */}
                        {ujian.map((u,indexUjian)=>(
                            u.ruangandosen.map((ruangandosen,indexRuanganDosen)=>(
                                <ItemPengawas key={u.id+""+ruangandosen.id} ujian={u} ruangandosen={ruangandosen} indexUjian={indexUjian} indexRuanganDosen={indexRuanganDosen} dosen={dosen} handleChange={handleChangePengawas} hiddenAndDisabled={hiddenAndDisabled} hidden={false}/>
                            ))
                        ))}
                    </table>
                </div> 
                <button type="submit" className="btn btn-warning w-100 my-2" onClick={edit} hidden={hiddenAndDisabled}>
                    <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                    Simpan Perubahan
                </button> 
            </div>
        </>
    )
}