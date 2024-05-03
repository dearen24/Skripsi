"use client"
import { useState, useEffect } from "react";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";
import { getJabatan } from "@/app/actions/jabatan";
import { useRouter } from "next/navigation";
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";
import ToastSuccessDelete from "../toast/SuccessDelete";


export default function MainJabatan(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan, setJabatan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedJabatan, setDisplayedJabatan] = useState(new Object);
    const router = useRouter();

    const closeToastTambah = () => setToastTambah(false);
    const openToastTambah = () => setToastTambah(true);

    useEffect(() => {
        // Fetch data on component mount
        const fetchData = async () => {
            try {
                const data = await getJabatan();

                setMaxPage(Math.ceil(data.length/10));
                setDisplayedJabatan(data.slice(0,10));
                setJabatan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setJabatan(data);
        router.refresh();
        openToastTambah();
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedJabatan(jabatan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedJabatan(jabatan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const addJabatan = () => {
        router.push("/admin/jabatan/add");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Jabatan</h1>
                <button className="btn btn-dark my-1" onClick={addJabatan}>Tambah Jabatan</button>
                <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Nama</th>						
                                <th className="text-center">Kouta Mengawas</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {search=="" ? 
                        displayedJabatan.map((role)=>(
                            <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
                        ))
                        :
                        jabatan.map((role)=>(
                            role.nama.toLowerCase().includes(search.toLowerCase()) ?
                            <ItemJabatan key={role.id} role={role} jabatan={jabatan} setJabatan={changeData} />
                            :
                            null
                        ))
                        }
                    </table>
                </div>
                {search=="" && jabatan.length > 10 ? 
                <div>
                    <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                </div>
                :
                null
                }
            </div> 

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Jabatan"}/>
        </>
    )
}