"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addUser } from "@/app/actions/user";
import { getJabatan } from "@/app/actions/jabatan"
import { useEffect,useRef,useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";

export default function AddUser(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan,setJabatan] = useState(new Object);
    const [modal,setModal] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/dosen");

    async function add(formData:FormData){
        const response = await addUser(formData);
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
        return <p>Loading...</p>
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Pengguna</h1>
                </div>
                <form id="form" ref={ref} action={add}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Email address</label>
                                <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group w-50">
                                <label>NIK</label>
                                <input className="form-control" name="NIK" placeholder="NIK"/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Nama</label>
                                <input className="form-control" name="nama" placeholder="Nama"/>
                            </div>
                            <div className="form-group w-50">
                                <label>Jabatan</label>
                                <select className="form-control" name="jabatan">
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
        </>
    )
}