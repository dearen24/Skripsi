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

export default function AddUjian({props}){
    const [isLoading,setLoading] = useState(true);
    const [semester,setSemester] = useState(new Object);
    const [matkul,setMatkul] = useState(new Object);
    const [selectedMatkul,setSelectedMatkul] = useState();
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState(props.semester.id);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/ujian");

    async function add(formData:FormData){
        const waktumulai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktumulai")?.toString()+":00");
        const waktuselesai = new Date(formData.get("tanggal")?.toString()+" "+formData.get("waktuselesai")?.toString()+":00");
        const date = new Date(formData.get("tanggal")?.toString()+"").toISOString();
        
        let arr = new Array;

        for(let i = 0;i<selectedMatkul.length;i++){
            let data = new Object;
            data.id = selectedMatkul[i];
            arr.push(data);
        }

        const response = await addUjian(formData,waktumulai,waktuselesai,arr);
        //const response = true;
        if(response==true){
            ref.current?.reset();
            openModal();
            openToast();
        }
        else{
            alert("Gagal Menambahkan Pengguna");
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
                    data.label = dataMatkul[i].matkul.nama;
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
            data.label = dataMatkul[i].matkul.nama;
            arrMatkul.push(data);
        }

        setMatkul(arrMatkul);
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Ujian</h1>
                </div>
                <form id="form" ref={ref} action={add}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester" onChange={handleChangeSemester}>
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
                                <input className="form-control" name="tanggal" type="date"/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Mulai</label>
                                <input className="form-control" name="waktumulai" type="time"/>
                            </div>
                            <div className="form-group w-50">
                                <label>Waktu Selesai</label>
                                <input className="form-control" name="waktuselesai" type="time"/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Tipe Ujian</label>
                                <select className="form-control" name="tipeujian">
                                    <option value="UTS">UTS</option>
                                    <option value="UTS">UAS</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Metode Ujian</label>
                                <select className="form-control" name="metodeujian">
                                    <option value="Daring">Daring</option>
                                    <option value="Luring">Luring</option>
                                    <option value="Proyek">Proyek</option>
                                    <option value="Presentasi">Presentasi</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Shift</label>
                                <select className="form-control" name="shift">
                                    <option value="0">Tidak Ada Shift</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select options={matkul} placeholder="Pilih Mata Kuliah" isMulti isSearchable isClearable name="matakuliah" onChange={handleChangeMatkul}/>
                            </div>
                        </div>
                    </div>
                    <AddButton page="Ujian"/>
                </form>
            </div>

            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Ujian"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Ujian"}/>
        </>
    )
}