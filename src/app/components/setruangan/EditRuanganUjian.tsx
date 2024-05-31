"use client"
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { editRuanganUjian, editUjian, getUjianByDateWaktu, getUjianById, getUjianByIdMany } from "@/app/actions/ujian";
import { getSemester } from "@/app/actions/semester";
import { getMatkul, getMatkulBySemester } from "@/app/actions/matkul";
import Select from "react-select";
import { getRuangan } from "@/app/actions/ruangan";
import LoadingPage from "../LoadingPage";
import ModalRoomColission from "../modal/RoomCollision";

export default function EditRuanganUjian({params}){
    const [isLoading,setLoading] = useState(true);
    const [ujian,setUjian] = useState();
    const [selectedMatkul,setSelectedMatkul] = useState();
    const [ruangan,setRuangan] = useState();
    const [matkul,setMatkul] = useState();
    const [modalBentrok,setModalBentrok] = useState(false);
    const [selectedRuangan,setSelectedRuangan] = useState(new Array);
    const [toast,setToast] = useState(false);
    const [rooms,setRooms] = useState([]);
    const [totalKapasitas,setTotalKapasitas] = useState(0);
    const [totalPeserta,setTotalPeserta] = useState(0);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const openModalBentrok = () => setModalBentrok(true);
    const closeModalBentrok = () => setModalBentrok(false);

    async function edit(){
        let bentrok = false;
        let ruanganBentrok = [];
        let arr = new Array;
        for(let i = 0;i<selectedRuangan.length;i++){
            let data = new Object;
            data.id = selectedRuangan[i];
            if(typeof selectedRuangan[i]=="object"){
                data.id = selectedRuangan[i].value;
            }
            arr.push(data);
        }

        const ujianBentrok = await getUjianByDateWaktu(ujian.date.toISOString(),ujian.mulai.toISOString(),ujian.selesai.toISOString(),ujian.id);

        for(let i = 0;i<arr.length;i++){//cek kalo ruangan yang mau dipake sekarang ada yang bentrok
            for(let j = 0;j<ujianBentrok.length;j++){
                for(let k = 0;k<ujianBentrok[j].ujian.length;k++){
                    if(arr[i].id==ujianBentrok[j].ujian[k].idRuangan){
                        ruanganBentrok.push(ujianBentrok[j].ujian[k].idRuangan);
                        bentrok = true;
                    }
                }
            }
        }
        
        let arrNamaRuangan = [];
        for(let i = 0;i<ruanganBentrok.length;i++){
            for(let j = 0;j<ruangan.length;j++){
                if(ruanganBentrok[i].toString()==ruangan[j].value.toString()){
                    arrNamaRuangan.push(ruangan[j].label);
                }
            }
        }

        setRooms(arrNamaRuangan);

        if(bentrok==false){
            const response = await editRuanganUjian(params,arr);
            if(response==true){
                openToast(); 
            }
            else{
                alert("Gagal Mengatur Ruangan Ujian");
            }
        }
        else{
            //kasi modal bentrok
            openModalBentrok();
        }
    }

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const dataUjian = await getUjianById(params);
                const dataRuangan = await getRuangan();
                const dataMatkul = await getMatkulBySemester(dataUjian?.idSemester);

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
                            let currPeserta = totalPeserta;
                            currPeserta += dataMatkul[i].matkulujian[0].peserta;
                            setTotalPeserta(currPeserta);
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
                                if(arrSelectedRuangan.some(ruangan=>ruangan.value==data.value)==false){//kalo belom ada di selected baru masukin
                                    arrSelectedRuangan.push(data);
                                    let currKapasitas = totalKapasitas;
                                    currKapasitas += dataRuangan[i].kapasitas;
                                    setTotalKapasitas(currKapasitas);
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
        let currKapasitas = 0;
        const ruangan = await getRuangan();
        for(let i = 0;i<ruangan.length;i++){
            for(let j = 0;j<e.length;j++){
                if(ruangan[i].id==e[j].value){
                    currKapasitas += ruangan[i].kapasitas;
                }
            }
        }
        setTotalKapasitas(currKapasitas);
        setSelectedRuangan(e.map(x => x.value));
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
                                <input className="form-control" value={ujian.semester.semester} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Tanggal</label>
                                <input className="form-control" name="tanggal" type="date" defaultValue={ujian.date.toISOString().substring(0,10)} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time" defaultValue={ujian.mulai.toTimeString().substring(0,5)} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time" defaultValue={ujian.selesai.toTimeString().substring(0,5)} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50 my-2">
                                <label>Kapasitas Ruangan : <strong>{totalKapasitas}</strong></label>
                                <label>Peserta Mata Kuliah : <strong>{totalPeserta}</strong></label>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <input className="form-control" value={ujian.tipe} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <input className="form-control" value={ujian.metode} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <input className="form-control" value={ujian.shift} readOnly style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select placeholder="Pilih Dosen Pengajar" name="dosenpengajar" defaultValue={selectedMatkul} isMulti isDisabled styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Ruangan</label>
                                {ujian.ujian.length==0 ? <Select placeholder="Pilih Ruangan" name="ruanganujian" options={ruangan} isMulti isClearable onChange={handleChangeRuangan} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/> : 
                                <Select placeholder="Pilih Ruangan" name="ruanganujian" options={ruangan} isMulti isClearable onChange={handleChangeRuangan} defaultValue={selectedRuangan} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>}
                                
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
            {rooms.length!=0 ?
                <ModalRoomColission modal={modalBentrok} closeModal={closeModalBentrok} rooms={rooms}/>
            :
                null
            }
        </>
    )
}