"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { editUjian, getUjianById } from "@/app/actions/ujian";
import { getSemester } from "@/app/actions/semester";
import { getMatkul } from "@/app/actions/matkul";
import Select from "react-select";

export default function EditUjian({params}){
    const [isLoading,setLoading] = useState(true);
    const [ujian,setUjian] = useState();
    const [semester,setSemester] = useState();
    const [selectedMatkul,setSelectedMatkul] = useState();
    const [dosen,setDosen] = useState();
    const [matkul,setMatkul] = useState();
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    async function edit(formData:FormData){
        const waktumulai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktumulai")?.toString()+":00");
        const waktuselesai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktuselesai")?.toString()+":00");
        const date = new Date(formData.get("tanggal")?.toString()+"").toISOString();
        
        let arr = new Array;

        for(let i = 0;i<selectedMatkul.length;i++){
            let data = new Object;
            data.id = selectedMatkul[i];
            if(typeof selectedMatkul[i]=="object"){
                data.id = selectedMatkul[i].value;
            }
            arr.push(data);
        }

        const response = await editUjian(formData,waktumulai,waktuselesai,arr,params);
        if(response==true){
            openToast(); 
        }
        else{
            alert("Gagal Mengubah Pengguna");
        }
    }

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const dataUjian = await getUjianById(params);
                const dataSemester = await getSemester();
                const dataMatkul = await getMatkul();

                let arrMatkul = [];
                let arrSelectedMatkul = [];

                for(let i = 0;i<dataMatkul.length;i++){
                    let data = new Object;
                    data.value = dataMatkul[i].id;
                    data.label = dataMatkul[i].kode+" - "+dataMatkul[i].nama;
                    for(let j = 0;j<dataUjian?.matkul.length;j++){
                        if(dataMatkul[i].id==dataUjian?.matkul[j].id){
                            arrSelectedMatkul.push(data);
                        }
                    }
                    arrMatkul.push(data);
                }

                setSelectedMatkul(arrSelectedMatkul);
                setMatkul(arrMatkul);
                setUjian(dataUjian);
                setSemester(dataSemester);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);
        
    const handleChangeMatkul = async (e) => {
        setSelectedMatkul(e.map(x => x.value));
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Ubah Ujian</h1>
                </div>
                <form id="form" action={edit}>
                <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester">
                                    {semester.map((sem)=>(
                                        sem.id == ujian.semester.id ? <option value={sem.id.toString()} selected>{sem.semester}</option> : <option value={sem.id.toString()}>{sem.semester}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Tanggal</label>
                                <input className="form-control" name="tanggal" type="date" defaultValue={ujian.date.toISOString().substring(0,10)}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time" defaultValue={ujian.mulai.toTimeString().substring(0,5)}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time" defaultValue={ujian.selesai.toTimeString().substring(0,5)}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <select className="form-control" name="tipeujian">
                                    {ujian.tipe == "UTS" ? <><option value="UTS" selected>UTS</option><option value="UAS">UAS</option></> 
                                    : <><option value="UTS">UTS</option><option value="UAS" selected>UAS</option></>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <select className="form-control" name="metodeujian">
                                    {ujian.metode == "Daring" ? <option value="Daring" selected>Daring</option> : <option value="Daring">Daring</option>}
                                    {ujian.metode == "Luring" ? <option value="Luring" selected>Luring</option> : <option value="Luring">Luring</option>}
                                    {ujian.metode == "Proyek" ? <option value="Proyek" selected>Proyek</option> : <option value="Proyek">Proyek</option>}
                                    {ujian.metode == "Presentasi" ? <option value="Presentasi" selected>Presentasi</option> : <option value="Presentasi">Presentasi</option>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <select className="form-control" name="shift">
                                    {ujian.shift == "0" ? <option value="0" selected>Tidak Ada Shift</option> : <option value="0">Tidak Ada Shift</option>}
                                    {ujian.shift == "1" ? <option value="1" selected>1</option> : <option value="1">1</option>}
                                    {ujian.shift == "2" ? <option value="2" selected>2</option> : <option value="2">2</option>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select options={matkul} placeholder="Pilih Mata Kuliah" isMulti isSearchable isClearable name="matakuliah" onChange={handleChangeMatkul} defaultValue={selectedMatkul}/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning w-100 my-2">
                        <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                        Simpan Perubahan
                    </button>
                </form>
            </div>

            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
        </>
    )
}