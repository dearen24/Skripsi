"use client"

import ItemDosen from "./ItemDosen";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {getUser} from "../../actions/user"
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import LoadingPengguna from "../../admin/dosen/loading";
import { useSession } from "next-auth/react";
import { getSessionServer } from "@/modules/session";
import ToastSuccessDelete from "../toast/SuccessDelete";

export default function MainPengguna(){
    const [isLoading,setLoading] = useState(true);
    const [pengguna, setPengguna] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedPengguna, setDisplayedPengguna] = useState(new Object);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getUser();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedPengguna(data.slice(0,10));
            setPengguna(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setPengguna(data);
        router.refresh();
        openToastTambah();
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedPengguna(pengguna.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedPengguna(pengguna.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const addPengguna = () => {
        router.push("/admin/dosen/add");
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengguna</h1>
                <button className="btn btn-dark my-1" onClick={addPengguna}>Tambah Pengguna</button>
                <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama</th>						
                                <th className="text-center">NIK</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Jabatan</th>
                                <th className="text-center">Kuota Mengawas</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {search=="" ?
                        displayedPengguna.map((user)=>(
                            <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
                        ))
                        :
                        pengguna.map((user)=>(
                            user.nama.toLowerCase().includes(search.toLowerCase()) ?
                            <ItemDosen key={user.id} dosen={user} pengguna={pengguna} setPengguna={changeData}/>
                            :
                            null
                        ))
                        }
                    </table>
                </div>
                {search=="" && pengguna.length > 10 ? 
                <div>
                    <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                </div>
                :
                null
                }
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Pengguna"}/>
        </>
    )
}