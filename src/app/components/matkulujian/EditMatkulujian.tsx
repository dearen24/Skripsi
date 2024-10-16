"use client"
import { getUser } from "@/app/actions/user";
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import { getMatkul } from "@/app/actions/matkul";
import { editMatkulujian, getMatkulujianById } from "@/app/actions/matkulujian";
import Select from "react-select";
import { getSemester } from "@/app/actions/semester";
import LoadingPage from "../LoadingPage";
import ToastErrorInput from "../toast/ErrorInput";
import { MatkulUjianSchema } from "@/modules/schema";

export default function EditMatkulUjian({params}){
    const [isLoading,setLoading] = useState(true);
    const [dataMatkulUjian,setMatkulUjian] = useState();
    const [selectedDosen,setSelectedDosen] = useState();
    const [selectedMatkul,setSelectedMatkul] = useState();
    const [dataDosen,setDosen] = useState();
    const [dataSemester,setSemester] = useState();
    const [dataMatkul,setMatkul] = useState();
    const [toast,setToast] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    async function edit(formData:FormData){
        let arr = new Array;
        for(let i = 0;i<selectedDosen.length;i++){
            let data = new Object;
            data.id = selectedDosen[i];
            if(typeof selectedDosen[i]=="object"){
                data.id = selectedDosen[i].value;
            }
            arr.push(data);
        }

        const data = {
            semester: formData.get("semester"),
            jumlahPeserta: Number(formData.get("jumlahpeserta")),
            matkul: formData.get("matkul"),
            dosenPengajar: arr,
        }

        const validation = MatkulUjianSchema.safeParse(data);
        
        if(validation.success){
            const response = await editMatkulujian(formData,params,arr);
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
                const dataDosen = await getUser();
                const dataSemester = await getSemester();
                const dataMatkul = await getMatkul();
                const dataMatkulUjian = await getMatkulujianById(params);
                let arrDosen = [];
                let arrMatkul = [];
                let arrSelectedDosen = [];

                for(let i = 0;i<dataDosen.length;i++){
                    let data = new Object;
                    data.value = dataDosen[i].id;
                    data.label = dataDosen[i].nama;
                    for(let j = 0;j<dataMatkulUjian?.dosenPengajar.length;j++){
                        if(dataDosen[i].id==dataMatkulUjian?.dosenPengajar[j].id){
                            arrSelectedDosen.push(data);
                        }
                    }
                    arrDosen.push(data);
                }

                for(let i = 0;i<dataMatkul.length;i++){
                    let data = new Object;
                    
                    data.value = dataMatkul[i].id;
                    data.label = dataMatkul[i].kode+" - "+dataMatkul[i].nama;
                    if(dataMatkul[i].id==dataMatkulUjian?.idMatkul){
                        setSelectedMatkul(data);
                    }
                    arrMatkul.push(data);
                }

                setMatkulUjian(dataMatkulUjian);
                setSelectedDosen(arrSelectedDosen);
                setDosen(arrDosen);
                setSemester(dataSemester);
                setMatkul(arrMatkul);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const handleChangeDosen = async (e) => {
        setSelectedDosen(e.map(x => x.value));
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Mata Kuliah Ujian</strong></h3>
                </div>
                <form id="form" action={edit}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester" style={{border:"2px solid black"}}>
                                    {dataSemester.map((sem)=>(
                                        sem.semester==dataMatkulUjian.semester.semester ? <option value={sem.id.toString()} selected>{sem.semester}</option> : <option value={sem.id.toString()}>{sem.semester}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select className="border black" options={dataMatkul} placeholder="Pilih Mata Kuliah" isSearchable name="matkul" defaultValue={selectedMatkul} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Jumlah Peserta</label>
                                <input className="form-control" type="number" name="jumlahpeserta" placeholder="Jumlah Peserta" defaultValue={dataMatkulUjian.peserta} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Dosen Pengajar</label>
                                <Select options={dataDosen} placeholder="Pilih Dosen Pengajar"  isMulti isSearchable isClearable name="dosenpengajar" onChange={handleChangeDosen} defaultValue={selectedDosen} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>
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