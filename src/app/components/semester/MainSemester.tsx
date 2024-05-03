"use client"
import ItemSemester from "./ItemSemester";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import {getSemester} from "../../actions/semester";
import LoadingPengguna from "../../admin/dosen/loading";
import ToastSuccessDelete from "../toast/SuccessDelete";

export default function MainSemester(){
    const [isLoading,setLoading] = useState(true);
    const [semester, setSemester] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedSemester, setDisplayedSemester] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const data = await getSemester();

            setMaxPage(Math.ceil(data.length/10));
            setDisplayedSemester(data.slice(0,10));
            setSemester(data)
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const changeData = async (data) => {
        setSemester(data);
        router.refresh();
        openToastTambah();
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedSemester(semester.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedSemester(semester.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }

    const addSemester = () => {
        router.push("/admin/semester/add");
    }

    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Pengguna</h1>
                <button className="btn btn-dark my-1" onClick={addSemester}>Tambah Semester</button>
                <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama</th>						
                                <th className="text-center">Status</th>
                                <th className="text-center" style={{borderTopRightRadius:'6px'}}>Action</th>
                            </tr>
                        </thead>
                        {search=="" ?
                        displayedSemester.map((sem)=>(
                            <ItemSemester key={sem.id} sem={sem} semester={semester} setSemester={changeData}/>
                        ))
                        :
                        semester.map((sem)=>(
                            sem.semester.toLowerCase().includes(search.toLowerCase()) ?
                            <ItemSemester key={sem.id} sem={sem} semester={semester} setSemester={changeData}/>
                            :
                            null
                        ))
                        }
                    </table>
                </div>
                {search=="" && semester.length > 10 ? 
                <div>
                    <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                </div>
                :
                null
                }
            </div>

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Semester"}/>
        </>
    )
}