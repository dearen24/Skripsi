"use client"
import { useState, useEffect } from "react";
import { getMyJadwal, getMyPengajuan, getOtherJadwal, insertPertukaran } from "../../actions/tukarjadwal"
import ItemPengajuanSaya from "./ItemPengajuanSaya";
import { FormSelect, ListGroup, Tab, Tabs } from "react-bootstrap";
import ItemJadwalSaya from "./ItemJadwalSaya";
import ItemJadwalDosenLain from "./ItemJadwalDosenLain";
import { getSemester } from "@/app/actions/semester";

export default function MainPengajuanTukar({props}){
    const [isLoading,setLoading] = useState(true);
    const [jadwalSaya, setJadwalSaya] = useState();
    const [jadwalDosenLain, setJadwalDosenLain] = useState();
    const [selectedJadwalSaya, setSelectedJadwalSaya] = useState("");
    const [selectedJadwalDosenLain, setSelectedJadwalDosenLain] = useState("");
    const [key,setKey] = useState('jadwalsaya');
    const [session,setSession] = useState({id:props.id,semester:props.semester.id});
    const [semester,setSemester] = useState();
    const [selectedSemester,setSelectedSemester] = useState(props.semester.id);
    const [selectedTipe,setSelectedTipe] = useState("UTS");

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            const jadwalSaya = await getMyJadwal(session.id,session.semester);
            const jadwalDosenLain = await getOtherJadwal(session.id,session.semester);
            const semester = await getSemester();
            const arrSaya = [];
            const arrDosenLain = [];

            for(let i = 0;i<jadwalSaya.length;i++){
                if(jadwalSaya[i].ujian.tipe.toString()==selectedTipe){
                    arrSaya.push(jadwalSaya[i]);
                }
            }

            for(let i = 0;i<jadwalDosenLain.length;i++){
                if(jadwalDosenLain[i].ujian.tipe.toString()==selectedTipe){
                    arrDosenLain.push(jadwalDosenLain[i]);
                }
            }

            setSemester(semester);
            setJadwalSaya(arrSaya);
            setJadwalDosenLain(arrDosenLain);
            setLoading(false);
        };
        fetchData();
    }, []);

    const buatPertukaran = async () => {
        await insertPertukaran(selectedJadwalSaya,selectedJadwalDosenLain,session.semester);
    }

    const onChangeSemester = async (e) => {
        const jadwalSayaTemp = await getMyJadwal(session.id,e.target.value);
        const jadwalDosenLainTemp = await getOtherJadwal(session.id,e.target.value);
        const arrSaya = [];
        const arrDosenLain = [];

        for(let i = 0;i<jadwalSayaTemp.length;i++){
            if(jadwalSayaTemp[i].ujian.tipe.toString()==selectedTipe){
                arrSaya.push(jadwalSayaTemp[i]);
            }
        }

        for(let i = 0;i<jadwalDosenLainTemp.length;i++){
            if(jadwalDosenLainTemp[i].ujian.tipe.toString()==selectedTipe){
                arrDosenLain.push(jadwalDosenLainTemp[i]);
            }
        }
        
        setSelectedSemester(e.target.value);
        setJadwalSaya(arrSaya);
        setJadwalDosenLain(arrDosenLain);
    }

    const onChangeTipe = async (e) => {
        const jadwalSaya = await getMyJadwal(session.id,selectedSemester);
        const jadwalDosenLain = await getOtherJadwal(session.id,selectedSemester);
        const arrSaya = [];
        const arrDosenLain = [];

        for(let i = 0;i<jadwalSaya.length;i++){
            if(jadwalSaya[i].ujian.tipe.toString()==e.target.value){
                arrSaya.push(jadwalSaya[i]);
            }
        }

        for(let i = 0;i<jadwalDosenLain.length;i++){
            if(jadwalDosenLain[i].ujian.tipe.toString()==e.target.value){
                arrDosenLain.push(jadwalDosenLain[i]);
            }
        }
        
        setSelectedTipe(e.target.value);
        setJadwalSaya(arrSaya);
        setJadwalDosenLain(arrDosenLain);
    }

    if(isLoading){
        return <p>Loading</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengajuan Pertukaran</h1>
                <div className="d-flex flex-row">
                    <div>
                        <FormSelect onChange={onChangeSemester}>
                            {semester.map((sem)=>(
                                <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div>
                        <FormSelect onChange={onChangeTipe}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <div>
                    <div className="d-flex flex-row">
                        <div >
                            <h6>Dari</h6>
                        </div>
                        <div className="px-2">
                            <ListGroup className="d-flex flex-row">
                                    {jadwalSaya.map((jadwal)=>(
                                        selectedJadwalSaya == jadwal.id ?
                                        <>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</h6>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</h6>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {jadwal.ujian.matkul.map((matkul)=>(
                                                <h6>{matkul.nama}</h6>
                                            ))}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ruangan.nama}</h6>
                                        </ListGroup.Item>
                                        </>
                                        :
                                        null
                                    ))}
                            </ListGroup>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div>
                            <h6>Ke</h6>
                        </div>
                        <div className="px-2">
                            <ListGroup className="d-flex flex-row">
                                    {jadwalDosenLain.map((jadwal)=>(
                                        selectedJadwalDosenLain == jadwal.id ?
                                        <>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</h6>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)+" - "+jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</h6>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            {jadwal.ujian.matkul.map((matkul)=>(
                                                <h6>{matkul.nama}</h6>
                                            ))}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>{jadwal.ruangan.nama}</h6>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h6>{jadwal.dosen.nama}</h6>
                                        </ListGroup.Item>
                                        </>
                                        :
                                        null
                                    ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={buatPertukaran}>Ajukan Pertukaran</button>
                <div>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="jadwalsaya" title="Jadwal Saya">
                            <ItemJadwalSaya selectedJadwalSaya={selectedJadwalSaya} setSelectedJadwalSaya={setSelectedJadwalSaya} jadwalsaya={jadwalSaya}/>
                        </Tab>
                        <Tab eventKey="jadwaldosenlain" title="Jadwal Dosen Lain">
                            <ItemJadwalDosenLain selectedJadwalDosenLain={selectedJadwalDosenLain} setSelectedJadwalDosenLain={setSelectedJadwalDosenLain} jadwaldosenlain={jadwalDosenLain}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>    
    )
}