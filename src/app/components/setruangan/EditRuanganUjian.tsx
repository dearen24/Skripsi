"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { editRuanganUjian, editUjian, getUjianById, getUjianByIdMany } from "@/app/actions/ujian";
import { getSemester } from "@/app/actions/semester";
import { getMatkul } from "@/app/actions/matkul";
import Select from "react-select";
import { getRuangan } from "@/app/actions/ruangan";

export default function EditRuanganUjian({params}){
    const [isLoading,setLoading] = useState(true);
    const [ujian,setUjian] = useState();
    const [selectedMatkul,setSelectedMatkul] = useState();
    const [ruangan,setRuangan] = useState();
    const [matkul,setMatkul] = useState();
    const [selectedRuangan,setSelectedRuangan] = useState(new Array);
    const [toast,setToast] = useState(false);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    async function edit(formData:FormData){
        
        let arr = new Array;

        for(let i = 0;i<selectedRuangan.length;i++){
            let data = new Object;
            data.id = selectedRuangan[i];
            if(typeof selectedRuangan[i]=="object"){
                data.id = selectedRuangan[i].value;
            }
            arr.push(data);
        }

        const response = await editRuanganUjian(params,arr);
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
                const dataRuangan = await getRuangan();
                const dataMatkul = await getMatkul();

                console.log(dataUjian.ujian.length);

                let arrMatkul = [];
                let arrSelectedMatkul = [];
                let arrRuangan = [];
                let arrSelectedRuangan = [];

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

                for(let i = 0;i<dataRuangan.length;i++){
                    let data = new Object;
                    data.value = dataRuangan[i].id;
                    data.label = dataRuangan[i].nama;
                    if(dataUjian?.ujian.length!=0){
                        for(let j = 0;j<dataUjian.ujian.length;j++){
                            if(dataRuangan[i].id==dataUjian.ujian[j].ruangan?.id){
                                if(arrSelectedRuangan.some(ruangan=>ruangan.value==data.value)==false){
                                    arrSelectedRuangan.push(data);
                                }
                            }
                        }
                    }
                    arrRuangan.push(data);
                }

                setSelectedRuangan(arrSelectedRuangan);
                setSelectedMatkul(arrSelectedMatkul);
                setMatkul(arrMatkul);
                setRuangan(arrRuangan);
                setUjian(dataUjian);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);
        
    const handleChangeRuangan = async (e) => {
        setSelectedRuangan(e.map(x => x.value));
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
                                <input className="form-control" value={ujian.semester.semester} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Tanggal</label>
                                <input className="form-control" name="tanggal" type="date" defaultValue={ujian.date.toISOString().substring(0,10)} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time" defaultValue={ujian.mulai.toTimeString().substring(0,5)} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time" defaultValue={ujian.selesai.toTimeString().substring(0,5)} readOnly/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <input className="form-control" value={ujian.tipe} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <input className="form-control" value={ujian.metode} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <input className="form-control" value={ujian.shift} readOnly/>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select placeholder="Pilih Dosen Pengajar" name="dosenpengajar" defaultValue={selectedMatkul} isMulti isDisabled/>
                            </div>
                            <div className="form-group w-50">
                                <label>Ruangan</label>
                                {ujian.ujian.length==0 ? <Select placeholder="Pilih Ruangan" name="ruanganujian" options={ruangan} isMulti isClearable onChange={handleChangeRuangan}/> : 
                                <Select placeholder="Pilih Ruangan" name="ruanganujian" options={ruangan} isMulti isClearable onChange={handleChangeRuangan} defaultValue={selectedRuangan}/>}
                                
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