"use client"
import { useEffect, useState } from "react";
import { getUjianBySemester, getUjianRuanganDosen, getUjianSemesterGroupByDate} from "../../actions/ujian";
import LoadingPengguna from "../../admin/dosen/loading";
import {getAllExamDate, getKonsumsi, getKonsumsiNonPengawasByDate} from "../../actions/konsumsi"
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";

export default function CekJumlahKonsumsi({props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian, setUjian] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [food, setFood] = useState(new Object);
    const [foodNonPengawas, setFoodNonPengawas] = useState(new Object);
    const [konsumsiPerDosen, setKonsumsiPerDosen] = useState(new Object);
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
            
            const food = await getKonsumsi(arr[0][0].date.toISOString(),"UTS",props.semester.id);
            const foodNonPengawas = await getKonsumsiNonPengawasByDate(arr[0][0].date.toISOString(),"UTS",props.semester.id);
            const konsumsiPerDosen = await getAllExamDate(arr[0][0].date.toISOString());
            const arrKonsumsiPerDosen = [];

            for(let i = 0;i<konsumsiPerDosen.length;i++){
                const index = arrKonsumsiPerDosen.findIndex(a=>a.idDosen==konsumsiPerDosen[i].idDosen);
                if(index==-1){
                    arrKonsumsiPerDosen.push(konsumsiPerDosen[i]);
                }
                else{
                    arrKonsumsiPerDosen[index].snack += konsumsiPerDosen[i].snack;
                    arrKonsumsiPerDosen[index].lunch += konsumsiPerDosen[i].lunch;
                }
            }

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

            setKonsumsiPerDosen(arrKonsumsiPerDosen);
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

        if(dataTemp.length!=0){
            tempData.date = arr[0][0].date.toISOString();
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

        if(dataTemp.length!=0){
            tempData.date = arr[0][0].date.toISOString();
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
        const foodTemp = await getKonsumsi(selectedData.date,selectedData.tipe,selectedData.semester);
        const foodNonPengawasTemp = await getKonsumsiNonPengawasByDate(selectedData.date,selectedData.tipe,selectedData.semester);
        const konsumsiPerDosen = await getAllExamDate(selectedData.date);
        const arrKonsumsiPerDosen = [];

        for(let i = 0;i<konsumsiPerDosen.length;i++){
            const index = arrKonsumsiPerDosen.findIndex(a=>a.idDosen==konsumsiPerDosen[i].idDosen);
            if(index==-1){
                arrKonsumsiPerDosen.push(konsumsiPerDosen[i]);
            }
            else{
                arrKonsumsiPerDosen[index].snack += konsumsiPerDosen[i].snack;
                arrKonsumsiPerDosen[index].lunch += konsumsiPerDosen[i].lunch;
            }
        }

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

        setKonsumsiPerDosen(arrKonsumsiPerDosen);
        setTotalSnack(totalSnack);
        setTotalLunch(totalLunch);
        setFood(foodTemp);
        setFoodNonPengawas(foodNonPengawasTemp);
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
                        </FormSelect>
                    </div>
                    <div className="">
                        <FormSelect onChange={onChangeDate} style={{border:"2px solid black"}}>
                            {ujian.map((u)=>(
                                u[0].date.toISOString()==selectedData.date ?
                                <option value={u[0].date.toISOString()} selected>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                                :
                                <option value={u[0].date.toISOString()}>{u[0].date.toDateString().split(" ")[0]+", "+u[0].date.toDateString().split(" ")[2]+" "+u[0].date.toDateString().split(" ")[1]+" "+u[0].date.toDateString().split(" ")[3]}</option>
                            ))}
                        </FormSelect>
                    </div>
                </div>
                <div className="d-flex flex-row w-100 justify-content-left px-1">
                    <div className="form-group d-flex flex-row align-items-center">
                        <label style={{paddingRight:"10px"}}>Snack</label>
                        <input className="form-control" value={totalSnack.toString()} style={{border:"2px solid black"}}/>
                        {/* {food[0].snack==null&&foodNonPengawas==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={(food[0].snack+foodNonPengawas.snack).toString()}/> } */}
                    </div>
                    <div className="form-group d-flex flex-row align-items-center">
                        <label className="px-3">Lunch</label>
                        <input className="form-control" value={totalLunch.toString()} style={{border:"2px solid black"}}/>
                        {/* {food[0].lunch==null ? <input className="form-control" readOnly value={0}/> : <input className="form-control" readOnly value={food[0].lunch.toString()}/> } */}
                    </div>
                </div>
                <div className="px-1 py-1">
                    <button className="btn" onClick={cekKonsumsi} style={{backgroundColor:"#272829", color:"white"}}>Cek Jumlah Konsumsi</button>
                </div>
            </div>
            <div className="mx-1">
                <Card style={{backgroundColor:"#272829",color:"white"}}>
                    <CardBody>
                        <Row className="text-center">
                            <Col>
                                <strong>Nama Dosen</strong>
                            </Col>
                            <Col>
                                <strong>Snack</strong>
                            </Col>
                            <Col>
                                <strong>Lunch</strong>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                {konsumsiPerDosen.map((konsum)=>(
                    <Card className="my-1" style={{borderRadius:"10px",border:"2px solid black"}}>
                        <CardBody>
                            <Row className="text-center">
                                <Col className="align-content-center">{konsum.dosen.nama}</Col>
                                <Col className="align-content-center">{konsum.snack.toString()}</Col>
                                <Col className="align-content-center">{konsum.lunch.toString()}</Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </>
    )
}