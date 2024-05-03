"use client"
import { useState, useEffect } from "react";
import { getRuangan } from "@/app/actions/ruangan";
import { useRouter } from "next/navigation";
import ToastSuccessDelete from "../toast/SuccessDelete";
import ItemRuangan from "./ItemRuangan";


export default function MainRuangan(){
    const [isLoading,setLoading] = useState(true);
    const [ruangan, setRuangan] = useState(new Object);
    const [toastTambah,setToastTambah] = useState(false);
    const [displayedRuangan, setDisplayedRuangan] = useState(new Object);
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
                const data = await getRuangan();

                setMaxPage(Math.ceil(data.length/10));
                setDisplayedRuangan(data.slice(0,10));
                setRuangan(data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
            fetchData();
        }, []);

    const changeData = async (data) => {
        setRuangan(data);
        setDisplayedRuangan(data.slice((page-1)*10,((page-1)*10)+9));
        router.refresh();
        openToastTambah();
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedRuangan(ruangan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedRuangan(ruangan.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }
    
    const addRuangan = () => {
        router.push("/admin/ruangan/add");
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <>
            <div className="table-responsive w-100">
                <h1>Ruangan</h1>
                <button className="btn btn-dark my-1" onClick={addRuangan}>Tambah Ruangan</button>
                <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th className="text-center">Nama</th>						
                                <th className="text-center">Kapasitas</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        {search=="" ?
                        displayedRuangan.map((classroom)=>(
                            <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
                        ))
                        :
                        ruangan.map((classroom)=>(
                            classroom.nama.toLowerCase().includes(search.toLowerCase()) ? 
                            <ItemRuangan key={classroom.id} class={classroom} ruangan={ruangan} setRuangan={changeData} />
                            :
                            null
                        ))
                        }
                    </table>
                </div>
                {search=="" && ruangan.length > 10 ? 
                <div>
                    <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                </div>
                :
                null
                }
            </div> 

            <ToastSuccessDelete toastTambah={toastTambah} closeToastTambah={closeToastTambah} page={"Ruangan"}/>
        </>
    )
}