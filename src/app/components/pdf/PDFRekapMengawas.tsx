"use client"
import { getSemesterById } from "@/app/actions/semester";
import { useEffect, useRef, useState } from "react";
import { Row } from "react-bootstrap";
import LoadingPage from "../LoadingPage";
import { getRekapMengawas } from "@/app/actions/rekapmengawas";
import { getUser } from "@/app/actions/user";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";

export default function PDFRekapMengawas({params}){
    const [semester,setSemester] = useState("");
    const [loading, setLoading] = useState(true);
    const [rekap, setRekap] = useState(new Object);
    const targetRef = useRef();

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const semester = await getSemesterById(params.semester);
                const rekap = await getRekapMengawas(params.semester,params.masaujian);
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
                
                setRekap(arrRekap);
                setSemester(semester);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
    }, []);

    const options = {
        // default is `save`
        method: 'save',
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.MEDIUM = 1,
        filename:"Rekap Mengawas.pdf",
        page: {
           // margin is in MM, default is Margin.NONE = 0
           margin: Margin.MEDIUM,
           // default is 'A4'
           format: 'A4',
           // default is 'portrait'
           orientation: 'potrait',
        }
     };

    if(loading){
        return <LoadingPage/>
    }

    return(
        <>
            <button className="btn btn-dark mx-1 my-1" onClick={()=>generatePDF(targetRef,options)} style={{backgroundColor:"#272829"}}><strong>Cetak Rekap Mengawas</strong></button>
            <div className="mx-5 px-5" style={{border:"2px solid black", backgroundColor:"white"}} ref={targetRef}>
                <Row className="text-center">
                    <h1>Rekap Mengawas</h1>
                </Row>
                <Row className="text-center">
                    <h3>{params.masaujian+" "+semester.semester}</h3>
                </Row>
                <Row>
                    <table className="table table-bordered" style={{border:"1px solid black"}}>
                        <thead>
                            <tr>
                                <th>Nama Dosen</th>
                                <th>Kuota Mengawas</th>
                                <th>Total Mengawas</th>
                                <th>Sisa Mengawas</th>
                                <th>Kuota Mengawas Selanjutnya</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rekap.map((rek)=>(
                            <tr>
                                <td>{rek.nama}</td>
                                <td>{rek.kuotaMengawas.toString()}</td>
                                <td>{rek.jumlahMengawas.toString()}</td>
                                <td>{rek.sisaMengawas.toString()}</td>
                                <td>{rek.kuotaSelanjutnya.toString()}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </Row>
            </div>
        </>
    )
}