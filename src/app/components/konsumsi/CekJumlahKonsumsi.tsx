"use client"
import { useEffect, useState } from "react";
import {getFood, getUjianBySemester, getUjianRuanganDosen, getUjianRuanganDosenGroupByDate, getUjianSemesterGroupByDate} from "../../actions/ujian";
import LoadingPengguna from "../../admin/dosen/loading";
import {addKonsumsiDosen, getAllExamDate, getAllExamDateDosen, getAturanKonsumsi, getKonsumsiNonPengawasByDate} from "../../actions/konsumsi"
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";

export default function CekJumlahKonsumsi({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [food, setFood] = useState(new Object);
    const [foodNonPengawas, setFoodNonPengawas] = useState(new Object);
    const [totalSnack, setTotalSnack] = useState(0);
    const [totalLunch, setTotalLunch] = useState(0);

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
            
            const food = await getFood(arr[0][0].date.toISOString(),"UTS",props.semester.id);
            const foodNonPengawas = await getKonsumsiNonPengawasByDate(arr[0][0].date.toISOString(),"UTS",props.semester.id);
            var totalSnack = 0;
            var totalLunch = 0;

            if(food[0]!=null){
                totalSnack += Number(food[0].snack);
                totalLunch += Number(food[0].lunch);
            }

            if(foodNonPengawas!=null){
                totalSnack += Number(foodNonPengawas.snack);
                totalLunch += Number(foodNonPengawas.lunch);
            }

            setTotalSnack(totalSnack);
            setTotalLunch(totalLunch);
            setFoodNonPengawas(foodNonPengawas);
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

    const onChangeSemester = async (e) => {
        const tempData = {...selectedData};
        tempData.semester = e.target.value;
        const dataTemp = await getUjianBySemester(tempData.semester,tempData.tipe);
        const arr = [];
        let index = 0;
        
        for(let i = 0;i<dataTemp.length;i++){
            if(i!=0){
                const dateBefore = String(dataTemp[i-1].date).split(" ")[1]+" "+String(dataTemp[i-1].date).split(" ")[2]+" "+String(dataTemp[i-1].date).split(" ")[3];
                const dateNow = String(dataTemp[i].date).split(" ")[1]+" "+String(dataTemp[i].date).split(" ")[2]+" "+String(dataTemp[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    arr[index].push(dataTemp[i]);
                }
                else{
                    index++;
                    arr.push([dataTemp[i]]);
                }
            }
            else{
                arr.push([dataTemp[i]]);
            }
        }

        setUjian(arr);
        setSelectedData(tempData);
    }

    const onChangeTipe = async (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;
        const dataTemp = await getUjianBySemester(tempData.semester,tempData.tipe);
        const arr = [];
        let index = 0;
        
        for(let i = 0;i<dataTemp.length;i++){
            if(i!=0){
                const dateBefore = String(dataTemp[i-1].date).split(" ")[1]+" "+String(dataTemp[i-1].date).split(" ")[2]+" "+String(dataTemp[i-1].date).split(" ")[3];
                const dateNow = String(dataTemp[i].date).split(" ")[1]+" "+String(dataTemp[i].date).split(" ")[2]+" "+String(dataTemp[i].date).split(" ")[3];
                
                if(dateBefore==dateNow){
                    arr[index].push(dataTemp[i]);
                }
                else{
                    index++;
                    arr.push([dataTemp[i]]);
                }
            }
            else{
                arr.push([dataTemp[i]]);
            }
        }

        setUjian(arr);
        setSelectedData(tempData);
    }

    const onChangeDate = (e) => {
        const tempData = {...selectedData};
        tempData.date = e.target.value;
        setSelectedData(tempData);
    }
    
    const cekKonsumsi = async (e) => {
        const foodTemp = await getFood(selectedData.date,selectedData.tipe,selectedData.semester);
        const foodNonPengawasTemp = await getKonsumsiNonPengawasByDate(selectedData.date,selectedData.tipe,selectedData.semester);
        var totalSnack = 0;
        var totalLunch = 0;

        if(foodTemp[0]!=null){
            totalSnack += Number(foodTemp[0].snack);
            totalLunch += Number(foodTemp[0].lunch);
        }

        if(foodNonPengawasTemp!=null){
            totalSnack += Number(foodNonPengawasTemp.snack);
            totalLunch += Number(foodNonPengawasTemp.lunch);
        }

        setTotalSnack(totalSnack);
        setTotalLunch(totalLunch);
        setFood(foodTemp);
        setFoodNonPengawas(foodNonPengawasTemp);
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
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
                                u[0].date.toISOString()==selectedData.date ?
                                <option value={u[0].date.toISOString()} selected>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                                :
                                <option value={u[0].date.toISOString()}>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-left">
                    <div className="form-group d-flex flex-row align-items-center">
                        <label style={{paddingRight:"10px"}}>Snack</label>
                        <input className="form-control" value={totalSnack.toString()}/>
                        {/* {food[0].snack==null&&foodNonPengawas==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={(food[0].snack+foodNonPengawas.snack).toString()}/> } */}
                    </div>
                    <div className="form-group d-flex flex-row align-items-center">
                        <label className="px-3">Lunch</label>
                        <input className="form-control" value={totalLunch.toString()} />
                        {/* {food[0].lunch==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={food[0].lunch.toString()}/> } */}
                    </div>
                </div>
                <div className="px-1 py-1">
                    <button className="btn btn-primary" onClick={cekKonsumsi}>Cek Jumlah Konsumsi</button>
                </div>
            </div>
        </>
    )
}