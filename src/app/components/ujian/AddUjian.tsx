"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import Select from "react-select";
import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { getSemester } from "@/app/actions/semester";
import { addUjian } from "@/app/actions/ujian";
import { getMatkulUjianBySemester } from "@/app/actions/matkulujian";
import ToastErrorInput from "../toast/ErrorInput";
import { UjianSchema } from "@/modules/schema";
import LoadingPage from "../LoadingPage";

export default function AddUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [semester,setSemester] = useState(new Object);
    const [matkul,setMatkul] = useState(new Object);
    const [selectedMatkul,setSelectedMatkul] = useState([]);
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    const backToHomepage = () => router.push("/admin/ujian");

    async function add(formData:FormData){
        let arr = new Array;
        for(let i = 0;i<selectedMatkul.length;i++){
            let data = new Object;
            data.id = selectedMatkul[i];
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
            
            const response = await addUjian(formData,waktumulai,waktuselesai,arr);
            if(response==true){
                ref.current?.reset();
                openModal();
                openToast();
            }
            else{
                alert("Gagal Menambahkan Pengguna");
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
                const dataSemester = await getSemester();
                const dataMatkul = await getMatkulUjianBySemester(props.semester.id);
                
                let arrMatkul = [];

                for(let i = 0;i<dataMatkul.length;i++){
                    let data = new Object;
                    data.value = dataMatkul[i].matkul.id;
                    data.label = dataMatkul[i].matkul.kode+" - "+dataMatkul[i].matkul.nama;
                    arrMatkul.push(data);
                }

                setMatkul(arrMatkul);
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

    const handleChangeSemester = async (e) => {
        const dataMatkul = await getMatkulUjianBySemester(e.target.value);
                
        let arrMatkul = [];

        for(let i = 0;i<dataMatkul.length;i++){
            let data = new Object;
            data.value = dataMatkul[i].matkul.id;
            data.label = dataMatkul[i].matkul.kode+" - "+dataMatkul[i].matkul.nama;
            arrMatkul.push(data);
        }

        setMatkul(arrMatkul);
    }

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Ujian</strong></h3>
                </div>
                <form id="form" ref={ref} action={add}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester" onChange={handleChangeSemester} style={{border:"2px solid black"}}>
                                    {semester.map((sem)=>(
                                        sem.id==selectedSemester ?
                                            <option value={sem.id.toString()} selected>{sem.semester}</option>
                                        :
                                            <option value={sem.id.toString()}>{sem.semester}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Tanggal</label>
                                <input className="form-control" name="tanggal" type="date" style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time" min={"08:00"} max={"16:00"} step={3600} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time" step={3600} min={"08:00"} max={"16:00"} style={{border:"2px solid black"}}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <select className="form-control" name="tipeujian" style={{border:"2px solid black"}}>
                                    <option value="UTS">UTS</option>
                                    <option value="UAS">UAS</option>
                                    <option value="Pendek">Pendek</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <select className="form-control" name="metodeujian" style={{border:"2px solid black"}}>
                                    <option value="Luring">Luring</option>
                                    <option value="Proyek">Proyek</option>
                                    <option value="Presentasi">Presentasi</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <select className="form-control" name="shift" style={{border:"2px solid black"}}>
                                    <option value="0">Tidak Ada Shift</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select options={matkul} placeholder="Pilih Mata Kuliah" isMulti isSearchable isClearable name="matakuliah" onChange={handleChangeMatkul} styles={{control: (baseStyles, state) => ({...baseStyles,border: state.isFocused ? '2px solid black' : '2px solid black',}),}}/>
                            </div>
                        </div>
                    </div>
                    <AddButton page="Ujian"/>
                </form>
            </div>

            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Ujian"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Ujian"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}