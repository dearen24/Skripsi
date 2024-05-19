"use client"
import { useEffect, useState } from "react";
import { getRekapMengawas } from "../../actions/rekapmengawas";
import LoadingPengguna from "../../admin/dosen/loading";
import { Card, CardBody, Col, FormSelect, Row } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import ItemRekapMengawas from "./ItemRekapMengawas";
import LoadingPage from "../LoadingPage";

export default function MainRekapMengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [rekap, setRekap] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedRekap, setDisplayedRekap] = useState(new Object);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const semester = await getSemester();
            const rekap = await getRekapMengawas(props.semester.id,"UTS");
        
            function compareByJumlah(a, b) {
                return a._count.idDosen - b._count.idDosen;
              }

            //rekap.sort(compareByJumlah);

            setSelectedData({tipe:"UTS",semester:props.semester.id});
            setMaxPage(Math.ceil(rekap.length/10));
            setDisplayedRekap(rekap.slice(0,10));
            setSemester(semester);
            setRekap(rekap);
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
        
        // function compareByJumlah(a, b) {
        //     return a._count.idDosen - b._count.idDosen;
        // }

        // rekapTemp.sort(compareByJumlah);

        setRekap(rekapTemp);
        setMaxPage(Math.ceil(rekapTemp.length/10));
        setDisplayedRekap(rekapTemp.slice(0,10));
        setSelectedData(tempData);
    }

    const onChangeTipe = async (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;

        const rekapTemp = await getRekapMengawas(tempData.semester,e.target.value);
        
        // function compareByJumlah(a, b) {
        //     return a._count.idDosen - b._count.idDosen;
        // }

        // rekapTemp.sort(compareByJumlah);

        setMaxPage(Math.ceil(rekapTemp.length/10));
        setDisplayedRekap(rekapTemp.slice(0,10));
        setRekap(rekapTemp);
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
                    </FormSelect>
                </div>
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
        </div>
    )
    
    // return(
    //     <>
    //         <div className="table-responsive w-100">
    //             <h1>Rekap Mengawas</h1>
    //             <div className="d-flex flex-row py-1">
    //                 <div>
    //                     <FormSelect onChange={onChangeSemester}>
    //                         {semester.map((sem)=>(
    //                             sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
    //                         ))}
    //                     </FormSelect>
    //                 </div>
    //                 <div className="px-1">
    //                     <FormSelect onChange={onChangeTipe}>
    //                         <option value="UTS">UTS</option>
    //                         <option value="UAS">UAS</option>
    //                     </FormSelect>
    //                 </div>
    //             </div>
    //             <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
    //             <div className="table-wrapper">
    //                 <table className="table table-hover align-middle">
    //                     <thead className="table-dark">
    //                         <tr className="">    
    //                             <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama Dosen</th>						
    //                             <th className="text-center">Jumlah Mengawas</th>
    //                         </tr>
    //                     </thead>
    //                     {search=="" ?
    //                     displayedRekap.map((rek)=>(
    //                         <ItemRekapMengawas rekap={rek}/>
    //                     ))
    //                     :
    //                     rekap.map((rek)=>(
    //                         rek.nama.toLowerCase().includes(search.toLowerCase()) ?
    //                         <ItemRekapMengawas rekap={rek}/>
    //                         :
    //                         null
    //                     ))
    //                     }
    //                 </table>
    //             </div>
    //             {search=="" && rekap.length > 10 ? 
    //             <div>
    //                 <button className="btn mx-1" onClick={prevPage} style={{backgroundColor:"#272829", color:"white"}}>Prev</button>
    //                 <button className="btn" onClick={nextPage} style={{backgroundColor:"#272829", color:"white"}}>Next</button>
    //             </div>
    //             :
    //             null
    //             }
    //         </div>
    //     </>
    // )
}

// Median
// function findMedian(arr) {
//     arr.sort((a, b) => a - b);
//     const middleIndex = Math.floor(arr.length / 2);

//     if (arr.length % 2 === 0) {
//         return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
//     } else {
//         return arr[middleIndex];
//     }
// } 

// Mode
// function findMedian(arr) {
//     arr.sort((a, b) => a - b);
//     let count = 1;
//     let maxCount = 1;
//     let mode = -1;
//     for(let i = 1;i<arr.length;i++){
//         if(arr[i]==arr[i-1]){
//             count++;
//         }
//         else{
//             if(count>maxCount){
//                 maxCount = count;
//                 mode = arr[i];
//             }
//             count = 1;
//         }
//     }

//     if(count>maxCount){
//         mode = arr[arr.length-1];
//     }

//     return maxCount;
// }
