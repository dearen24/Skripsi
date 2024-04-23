"use client"
import { useEffect, useState } from "react";
import {getFood, getUjianRuanganDosen, getUjianRuanganDosenGroupByDate, getUjianSemesterGroupByDate} from "../../actions/ujian";
import LoadingPengguna from "../../admin/dosen/loading";
import {addKonsumsiDosen, getAllExamDate, getAllExamDateDosen, getAturanKonsumsi} from "../../actions/konsumsi"
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";

export default function MainKonsumsi({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [food, setFood] = useState(new Object);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUjianSemesterGroupByDate(props.semester.id);
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
            
            const food = await getFood(arr[0][0].date.toISOString(),"UTS",props.semester.id);
            setSelectedData({date:arr[0][0].date.toISOString(),tipe:"UTS",semester:props.semester.id});
            setFood(food);
            setSemester(semester);
            setUjian(arr);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const onChangeSemester = (e) => {
        const tempData = {...selectedData};
        tempData.semester = e.target.value;
        setSelectedData(tempData);
    }

    const onChangeTipe = (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;
        setSelectedData(tempData);
    }

    const onChangeDate = (e) => {
        const tempData = {...selectedData};
        tempData.date = e.target.value;
        setSelectedData(tempData);
    }
    
    const cekKonsumsi = async (e) => {
        const foodTemp = await getFood(selectedData.date,selectedData.tipe,selectedData.semester);
        setFood(foodTemp);
    }

    const countKonsumsi = async () => {
        const aturan = await getAturanKonsumsi();
        const arrAturan = [];
        for(let i = 0;i<aturan.length;i++){
            arrAturan.push({sebelum12:aturan[i].sebelum12,melewati12:aturan[i].melewati12,setelah12:aturan[i].setelah12});
        }

        for(let i = 0;i<ujian.length;i++){
            const date = new Date(ujian[i][0].date).toISOString().substring(0,10);
            const ujianDate = await getAllExamDate(date);
            const arrDosen = [];
            for(let j = 0;j<ujianDate.length;j++){
                if(arrDosen.some(dosen=>dosen.id == ujianDate[j].idDosen)==false){
                    arrDosen.push(ujianDate[j].dosen);
                }
            }

            for(let j = 0;j<arrDosen.length;j++){
                const dosen = await getAllExamDateDosen(date,arrDosen[j].id);
                const idUjianRuanganDosen = dosen[0].id;
                let konsumsiDosen = {sebelum12:false,melewati12:false,setelah12:false};
                for(let k = 0;k<dosen.length;k++){
                    const mulai = new Date(dosen[k].ujian.mulai).toTimeString().substring(0,5);
                    const selesai = new Date(dosen[k].ujian.selesai).toTimeString().substring(0,5);
                    if(mulai<"12:00"&&selesai<"12:00"){
                        konsumsiDosen.sebelum12 = true;
                    }
                    if(mulai<="12:00"&&selesai>="12:00"){
                        konsumsiDosen.melewati12 = true;
                    }
                    if(mulai>"12:00"&&selesai>"12:00"){
                        konsumsiDosen.setelah12 = true;
                    }
                }
                const index = arrAturan.findIndex(a=>a.sebelum12==konsumsiDosen.sebelum12&&a.melewati12==konsumsiDosen.melewati12&&a.setelah12==konsumsiDosen.setelah12);
                const jenisKonsumsi = aturan[index].konsumsi;
                await addKonsumsiDosen(idUjianRuanganDosen,jenisKonsumsi);
            }
        }
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Konsumsi</h1>
                <div className="d-flex flex-row py-1">
                    <div>
                        <FormSelect onChange={onChangeSemester}>
                            {semester.map((sem)=>(
                                sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={onChangeTipe}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                    <div className="">
                        <FormSelect onChange={onChangeDate}>
                            {ujian.map((u)=>(
                                <option value={u[0].date.toISOString()}>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="px-1">
                        <button className="btn btn-primary" onClick={cekKonsumsi}>Cek Jumlah Konsumsi</button>
                    </div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-left">
                    <div className="form-group d-flex flex-row align-items-center">
                        <label style={{paddingRight:"10px"}}>Snack</label>
                        {food[0].snack==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={food[0].snack.toString()}/> }
                    </div>
                    <div className="form-group d-flex flex-row align-items-center">
                        <label className="px-3">Lunch</label>
                        {food[0].lunch==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={food[0].lunch.toString()}/> }
                    </div>
                </div>
                <button className="btn btn-primary" onClick={countKonsumsi}>Hitung Konsumsi</button>
            </div>
        </>
    )
}