"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { editUjian, getUjianById } from "@/app/actions/ujian";
import { getSemester } from "@/app/actions/semester";
import Select from "react-select";
import { getMatkulUjianBySemester } from "@/app/actions/matkulujian";
import LoadingPage from "../LoadingPage";
import ToastErrorInput from "../toast/ErrorInput";
import { UjianSchema } from "@/modules/schema";

export default function EditUjian({params,props}){
    const [isLoading,setLoading] = useState(true);
    const [ujian,setUjian] = useState();
    const [semester,setSemester] = useState();
    const [selectedMatkul,setSelectedMatkul] = useState([]);
    const [dosen,setDosen] = useState();
    const [matkul,setMatkul] = useState();
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    async function edit(formData:FormData){
        let arr = new Array;
        for(let i = 0;i<selectedMatkul.length;i++){
            let data = new Object;
            data.id = selectedMatkul[i];
            if(typeof selectedMatkul[i]=="object"){
                data.id = selectedMatkul[i].value;
            }
            arr.push(data);
        }

        const data = {
            semester: formData.get("semester"),
            tanggal: formData.get("tanggal"),
            mulai: formData.get("waktumulai")+":00",
            selesai: formData.get("waktuselesai")+":00",
            tipeujian: formData.get("tipeujian"),
            metodeujian: formData.get("metodeujian"),
            shift: Number(formData.get("shift")),
            matkul: arr
        }

        const validation = UjianSchema.safeParse(data);

        if(validation.success){
            const waktumulai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktumulai")?.toString()+":00");
            const waktuselesai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktuselesai")?.toString()+":00");
            const date = new Date(formData.get("tanggal")?.toString()+"").toISOString();

            const response = await editUjian(formData,waktumulai,waktuselesai,arr,params);
            if(response==true){
                openToast(); 
            }
            else{
                alert("Gagal Mengubah Pengguna");
            }
        }
        else{
            setError(validation.error.issues);
            openToastError();
        } 
    }

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const dataUjian = await getUjianById(params);
                const dataSemester = await getSemester();
                const dataMatkul = await getMatkulUjianBySemester(props.semester.id);

                let arrMatkul = [];
                let arrSelectedMatkul = [];

                for(let i = 0;i<dataMatkul.length;i++){
                    let data = new Object;
                    data.value = dataMatkul[i].matkul.id;
                    data.label = dataMatkul[i].matkul.kode+" - "+dataMatkul[i].matkul.nama;
                    for(let j = 0;j<dataUjian?.matkul.length;j++){
                        if(dataMatkul[i].matkul.id==dataUjian?.matkul[j].id){
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
        setSelectedMatkul(e.map(x => x));
    }

    const handleChangeSemester = async (e) => {
        const dataMatkul = await getMatkulUjianBySemester(e.target.value);
        console.log(document.getElementById("selectmatkul"));

        let arrMatkul = [];
        let arrSelectedMatkul = [];

        for(let i = 0;i<dataMatkul.length;i++){
            let data = new Object;
            data.value = dataMatkul[i].matkul.id;
            data.label = dataMatkul[i].matkul.kode+" - "+dataMatkul[i].matkul.nama;
            for(let j = 0;j<ujian?.matkul.length;j++){
                if(dataMatkul[i].matkul.id==ujian?.matkul[j].id){
                    arrSelectedMatkul.push(data);
                }
            }
            arrMatkul.push(data);
        }

        setMatkul(arrMatkul);
        setSelectedMatkul(arrSelectedMatkul);
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Ujian</strong></h3>
                </div>
                <form id="form" action={edit}>
                <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester" onChange={handleChangeSemester} style={{border:"2px solid black"}}>
                                    {semester.map((sem)=>(
                                        sem.id == ujian.semester.id ? <option value={sem.id.toString()} selected>{sem.semester}</option> : <option value={sem.id.toString()}>{sem.semester}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Tanggal</label>
                                <input className="form-control" name="tanggal" type="date" defaultValue={ujian.date.toISOString().substring(0,10)} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time" defaultValue={ujian.mulai.toTimeString().substring(0,5)} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time" defaultValue={ujian.selesai.toTimeString().substring(0,5)} style={{border:"2px solid black"}}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <select className="form-control" name="tipeujian" style={{border:"2px solid black"}}>
                                    {ujian.tipe == "UTS" ? <><option value="UTS" selected>UTS</option><option value="UAS">UAS</option></> 
                                    : <><option value="UTS">UTS</option><option value="UAS" selected>UAS</option></>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <select className="form-control" name="metodeujian" style={{border:"2px solid black"}}>
                                    {ujian.metode == "Luring" ? <option value="Luring" selected>Luring</option> : <option value="Luring">Luring</option>}
                                    {ujian.metode == "Daring" ? <option value="Daring" selected>Daring</option> : <option value="Daring">Daring</option>}
                                    {ujian.metode == "Proyek" ? <option value="Proyek" selected>Proyek</option> : <option value="Proyek">Proyek</option>}
                                    {ujian.metode == "Presentasi" ? <option value="Presentasi" selected>Presentasi</option> : <option value="Presentasi">Presentasi</option>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <select className="form-control" name="shift" style={{border:"2px solid black"}}>
                                    {ujian.shift == "0" ? <option value="0" selected>Tidak Ada Shift</option> : <option value="0">Tidak Ada Shift</option>}
                                    {ujian.shift == "1" ? <option value="1" selected>1</option> : <option value="1">1</option>}
                                    {ujian.shift == "2" ? <option value="2" selected>2</option> : <option value="2">2</option>}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select options={matkul} id="selectmatkul" value={selectedMatkul} placeholder="Pilih Mata Kuliah" isMulti isSearchable isClearable name="matakuliah" onChange={handleChangeMatkul} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-warning w-100 my-2" style={{border:"2px solid black"}}>
                        <Image src="/floppy-fill-black.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                        Simpan Perubahan
                    </button>
                </form>
            </div>

            <ToastSuccessEdit toast={toast} closeToast={closeToast}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}