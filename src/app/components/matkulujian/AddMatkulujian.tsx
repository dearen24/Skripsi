"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addUser, getUser } from "@/app/actions/user";
import { getJabatan } from "@/app/actions/jabatan";
import Select from "react-select";
import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import { addMatkulujian } from "@/app/actions/matkulujian";
import { getSemester } from "@/app/actions/semester";
import { getMatkul } from "@/app/actions/matkul";
import { Form } from "react-bootstrap";
import React from "react";

export default function AddMatkulUjian(){
    const [isLoading,setLoading] = useState(true);
    const [semester,setSemester] = useState(new Object);
    const [matkul,setMatkul] = useState(new Object);
    const [dosen,setDosen] = useState(new Object);
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const [selectedDosen, setSelectedDosen] = useState();
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/matkulujian");

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const dataSemester = await getSemester();
                const dataMatkul = await getMatkul();
                const dataDosen = await getUser();
                let arrDosen = [];
                let arrMatkul = [];

                for(let i = 0;i<dataDosen.length;i++){
                    let data = new Object;
                    data.value = dataDosen[i].id;
                    data.label = dataDosen[i].nama;
                    arrDosen.push(data);
                }

                for(let i = 0;i<dataMatkul.length;i++){
                    let data = new Object;
                    data.value = dataMatkul[i].id;
                    data.label = dataMatkul[i].kode+" - "+dataMatkul[i].nama;
                    arrMatkul.push(data);
                }

                setSemester(dataSemester);
                setMatkul(arrMatkul);
                setDosen(arrDosen);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    async function add(formData:FormData){
        let arr = new Array;

        for(let i = 0;i<selectedDosen.length;i++){
            let data = new Object;
            data.id = selectedDosen[i];
            arr.push(data);
        }
        
        const response = await addMatkulujian(formData,arr);
        // const response = true;
        if(response==true){
            ref.current?.reset();
            openModal();
            openToast();
        }
        else{
            alert("Gagal Menambahkan Pengguna");
        }
    }

    const handleChangeDosen = async (e) => {
        setSelectedDosen(e.map(x => x.value));
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Mata Kuliah Ujian</h1>
                </div>
                <form id="form" ref={ref} action={add}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Semester</label>
                                <select className="form-control" name="semester">
                                    {semester.map((sem)=>(
                                        <option value={sem.id.toString()}>{sem.semester}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="form-group w-50">
                                <label>Mata Kuliah</label>
                                <Select options={matkul} placeholder="Pilih Mata Kuliah" isSearchable name="matkul"/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Jumlah Peserta</label>
                                <input className="form-control" type="number" name="jumlahpeserta" placeholder="Jumlah Peserta"/>
                            </div>
                            <div className="form-group w-50">
                                <label>Dosen Pengajar</label>
                                <Select options={dosen} placeholder="Pilih Dosen Pengajar" isMulti isSearchable isClearable name="dosenpengajar" onChange={handleChangeDosen}/>
                            </div>
                        </div>
                    </div>
                    <AddButton page="Mata Kuliah Ujian"/>
                </form>
            </div>

            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Mata Kuliah Ujian"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Mata Kuliah Ujian"}/>
        </>
    )
}