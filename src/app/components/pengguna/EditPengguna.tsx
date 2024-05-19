"use client"
import { getJabatan } from "@/app/actions/jabatan";
import { getUserById,editUser, getUserAdmin } from "@/app/actions/user";
import { useState,useEffect } from "react";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";
import ModalCannotEditAdminRole from "../modal/CannotEditAdminRole";
import { PenggunaSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function EditUser({params}){
    const [isLoadingJabatan,setLoadingJabatan] = useState(true);
    const [isLoadingUser,setLoadingUser] = useState(true);
    const [user,setUser] = useState();
    const [toast,setToast] = useState(false);
    const [jabatan,setJabatan] = useState(new Object);
    const [modal, setModal] = useState(false);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);

    async function edit(formData:FormData){
        const userAdmin = await getUserAdmin();
        if(userAdmin.id==user.id&&formData.get("jabatan")?.toString()!=userAdmin?.role.id.toString()){
            openModal();
        }
        else{
            const data = {
                email: formData.get("email"),
                nik: formData.get("NIK"),
                nama: formData.get("nama"),
                jabatan: formData.get("jabatan"),
            }

            const validation = PenggunaSchema.safeParse(data);

            if(validation.success){
                const response = await editUser(formData,params);
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
    }

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getUserById(params);
                setUser(data);
                setLoadingUser(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getJabatan();
                setJabatan(data)
                setLoadingJabatan(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    if(isLoadingUser){
        return <p>Loading...</p>
    }

    if(isLoadingJabatan){
        return <p>Loading...</p>
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Ubah Pengguna</strong></h3>
                </div>
                <form id="form" action={edit}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Email address</label>
                                <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" defaultValue={user?.email} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>NIK</label>
                                <input className="form-control" name="NIK" placeholder="NIK" defaultValue={user?.nik} style={{border:"2px solid black"}}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Nama</label>
                                <input className="form-control" name="nama" placeholder="Nama" defaultValue={user?.nama} style={{border:"2px solid black"}}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Jabatan</label>
                                <select className="form-control" name="jabatan" style={{border:"2px solid black"}}>
                                    {jabatan.map((role)=>(
                                        role.id==user?.role.id ? <option value={role.id.toString()} selected>{role.nama}</option> : <option value={role.id.toString()}>{role.nama}</option>
                                        ))}
                                </select>
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
            <ModalCannotEditAdminRole modal={modal} closeModal={closeModal}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error}/>
        </>
    )
}