"use client"
import { useState, useEffect } from "react";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";
import { getJabatan } from "@/app/actions/jabatan";
import { useRouter } from "next/navigation";
import { Accordion, CloseButton, Form, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessDelete from "../toast/SuccessDelete";
import { getUjianBySemester, getUjianRuanganDosenGroupByDate } from "@/app/actions/ujian";
import ItemJadwal from "./ItemJadwal";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";


export default function MainJadwal({props}){
    const [isLoading,setLoading] = useState(true);
    const [jadwal, setJadwal] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState({semester:props.semester.id,tipe:"UTS"});

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getUjianBySemester(selectedData.semester,selectedData.tipe);
                const semester = await getSemester();
                const arr = [];
                let index = 0;
                
                for(let i = 0;i<data.length;i++){
                    data[i].ruangandosen = [];
                    for(let j = 0;j<data[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                        if(data[i].ruangandosen.length==0){
                            data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                        }
                        else{
                            if(data[i].ruangandosen.some(ruangan=>ruangan.id == data[i].ujian[j].ruangan?.id)==false){
                                data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                            }
                        }
                    }

                    for(let j = 0;j<data[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                        data[i].ruangandosen[j].dosen = [];
                    }

                    for(let j = 0;j<data[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                        const idRuanganNow = data[i].ujian[j].ruangan?.id;
                        for(let k = 0;k<data[i].ruangandosen.length;k++){
                            if(idRuanganNow==data[i].ruangandosen[k].id&&data[i].ujian[j].dosen!=null){
                                data[i].ruangandosen[k].dosen.push({nama:data[i].ujian[j].dosen.nama});
                            }
                        }    
                    }

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

                setSemester(semester);
                setJadwal(arr);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const handleChangeSemester = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.semester = e.target.value;
        setSelectedData(dataTemp);
        const data = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const arr = [];
        let index = 0;
        for(let i = 0;i<data.length;i++){
            data[i].ruangandosen = [];
            for(let j = 0;j<data[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                if(data[i].ruangandosen.length==0){
                    data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                }
                else{
                    if(data[i].ruangandosen.some(ruangan=>ruangan.id == data[i].ujian[j].ruangan?.id)==false){
                        data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                    }
                }
            }

            for(let j = 0;j<data[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                data[i].ruangandosen[j].dosen = [];
            }

            for(let j = 0;j<data[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                const idRuanganNow = data[i].ujian[j].ruangan?.id;
                for(let k = 0;k<data[i].ruangandosen.length;k++){
                    if(idRuanganNow==data[i].ruangandosen[k].id&&data[i].ujian[j].dosen!=null){
                        data[i].ruangandosen[k].dosen.push({nama:data[i].ujian[j].dosen.nama});
                    }
                }    
            }

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

        setJadwal(arr);
    }

    const handleChangeTipe = async (e) => {
        const dataTemp = {...selectedData};
        dataTemp.tipe = e.target.value;
        setSelectedData(dataTemp);
        const data = await getUjianBySemester(dataTemp.semester,dataTemp.tipe);
        const arr = [];
        let index = 0;
        for(let i = 0;i<data.length;i++){
            data[i].ruangandosen = [];
            for(let j = 0;j<data[i].ujian.length;j++){//isi ruangan yang ada ke object baru ujian
                if(data[i].ruangandosen.length==0){
                    data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                }
                else{
                    if(data[i].ruangandosen.some(ruangan=>ruangan.id == data[i].ujian[j].ruangan?.id)==false){
                        data[i].ruangandosen.push(data[i].ujian[j].ruangan);
                    }
                }
            }

            for(let j = 0;j<data[i].ruangandosen.length;j++){//isi setiap ruangan di objek barunya biar ada array dosennya
                data[i].ruangandosen[j].dosen = [];
            }

            for(let j = 0;j<data[i].ujian.length;j++){//isi setiap ruangan sesuai dengan dosennya
                const idRuanganNow = data[i].ujian[j].ruangan?.id;
                for(let k = 0;k<data[i].ruangandosen.length;k++){
                    if(idRuanganNow==data[i].ruangandosen[k].id&&data[i].ujian[j].dosen!=null){
                        data[i].ruangandosen[k].dosen.push({nama:data[i].ujian[j].dosen.nama});
                    }
                }    
            }

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

        setJadwal(arr);
    }
    
    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h3 className="mx-1"><strong>Jadwal Dosen</strong></h3>
                <div className="table-wrapper">
                    <div className="d-flex flex-row my-1 mx-1">
                        <div className="dropdown">
                            <Form.Select onChange={handleChangeSemester} aria-label="Semester" style={{border:"2px solid black"}}>
                                {semester.map((sem)=>(
                                    sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="dropdown mx-1">
                            <Form.Select onChange={handleChangeTipe} aria-label="Masa Ujian" style={{border:"2px solid black"}}>
                                <option value="UTS" selected>UTS</option>
                                <option value="UAS">UAS</option>
                            </Form.Select>
                        </div>
                    </div>
                {jadwal.map((data)=>(
                    <Accordion className="mx-1 my-1" style={{border:"2px solid black",borderRadius:"8px"}}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><strong>{String(data[0].date).split(" ")[0]+", "+String(data[0].date).split(" ")[1]+" "+String(data[0].date).split(" ")[2]+" "+String(data[0].date).split(" ")[3]}</strong></Accordion.Header>
                            <Accordion.Body>
                                <ItemJadwal data={data}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
                </div>
            </div>
        </>
    )
}