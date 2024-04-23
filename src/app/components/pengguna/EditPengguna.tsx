"use client"
import { getJabatan } from "@/app/actions/jabatan";
import { getUserById,editUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";
import ToastSuccessEdit from "../toast/SuccessEdit";

export default function EditUser({params}){
    const [isLoadingJabatan,setLoadingJabatan] = useState(true);
    const [isLoadingUser,setLoadingUser] = useState(true);
    const [user,setUser] = useState();
    const [toast,setToast] = useState(false);
    const [jabatan,setJabatan] = useState(new Object);
    const router = useRouter();

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    async function edit(formData:FormData){
        const response = await editUser(formData,params);
        if(response==true){
            openToast();
            // setTimeout(() => {
            //     router.push("/admin/dosen");
            // }, 1200);   
        }
        else{
            alert("Gagal Mengubah Pengguna");
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
            <div>
                <div>
                    <h1>Ubah Pengguna</h1>
                </div>
                <form id="form" action={edit}>
                    <div className="d-flex flex-row w-100">
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Email address</label>
                                <input type="email" name="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" defaultValue={user?.email}/>
                            </div>
                            <div className="form-group w-50">
                                <label>NIK</label>
                                <input className="form-control" name="NIK" placeholder="NIK" defaultValue={user?.nik}/>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="form-group w-50">
                                <label>Nama</label>
                                <input className="form-control" name="nama" placeholder="Nama" defaultValue={user?.nama}/>
                            </div>
                            <div className="form-group w-50">
                                <label>Jabatan</label>
                                <select className="form-control" name="jabatan">
                                    {jabatan.map((role)=>(
                                        role.id==user?.role.id ? <option value={role.id.toString()} selected>{role.nama}</option> : <option value={role.id.toString()}>{role.nama}</option>
                                        ))}
                                </select>
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