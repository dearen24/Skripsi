"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addUser } from "@/app/actions/user";
import { getJabatan } from "@/app/actions/jabatan"
import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import LoadingPage from "../LoadingPage";
import ToastErrorInput from "../toast/ErrorInput";
import { PenggunaSchema } from "@/modules/schema";

export default function AddUser(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan,setJabatan] = useState(new Object);
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
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

    const backToHomepage = () => router.push("/admin/dosen");

    async function add(formData:FormData){
        const data = {
            email: formData.get("email"),
            nik: formData.get("NIK"),
            nama: formData.get("nama"),
            jabatan: formData.get("jabatan"),
        }

        const validation = PenggunaSchema.safeParse(data);

        if(validation.success){
            const response = await addUser(formData);
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
                const data = await getJabatan();
                setJabatan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    if(isLoading){
        return <LoadingPage/>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Pengguna</strong></h3>
                </div>
                <form id="form" ref={ref} action={add}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Email address</label>
                                <input name="email" className="form-control" placeholder="Masukan email pengguna" style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>NIK</label>
                                <input className="form-control" name="NIK" placeholder="Masukan NIK pengguna" style={{border:"2px solid black"}}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Nama</label>
                                <input className="form-control" name="nama" placeholder="Masukan Nama Pengguna" style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Jabatan</label>
                                <select className="form-control" name="jabatan" style={{border:"2px solid black"}}>
                                    {jabatan.map((role)=>(
                                        <option value={role.id.toString()}>{role.nama}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <AddButton page="Pengguna"/>
                </form>
            </div>

            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Pengguna"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Pengguna"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}