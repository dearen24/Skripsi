"use client"
import { useEffect, useState } from "react";
import {getFood, getUjianRuanganDosen, getUjianRuanganDosenGroupByDate, getUjianSemesterGroupByDate} from "../../actions/ujian";
import LoadingPengguna from "../../admin/dosen/loading";
import {addKonsumsiDosen, getAllExamDate, getAllExamDateDosen, getAturanKonsumsi} from "../../actions/konsumsi"
import { FormSelect, Tab, Tabs } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import CekJumlahKonsumsi from "./CekJumlahKonsumsi";
import HitungKonsumsi from "./HitungKonsumsi";
import KonsumsiNonPengawas from "./KonsumsiNonPengawas";

export default function MainKonsumsi({props}){
    const [key,setKey] = useState('cekkonsumsi');
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Konsumsi</h1>
                <div>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="cekkonsumsi" title="Cek Jumlah Konsumsi">
                            <CekJumlahKonsumsi props={props}/>
                        </Tab>
                        <Tab eventKey="hitungkonsumsi" title="Hitung Konsumsi">
                            <HitungKonsumsi props={props}/>
                        </Tab>
                        <Tab eventKey="konsumsinonpengawas" title="Konsumsi Non-Pengawas">
                            <KonsumsiNonPengawas props={props}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>         
    )
}