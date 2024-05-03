"use client"
import { useEffect, useState } from "react";
import { getRekapMengawas } from "../../actions/rekapmengawas";
import LoadingPengguna from "../../admin/dosen/loading";
import { FormSelect } from "react-bootstrap";
import { getSemester } from "@/app/actions/semester";
import ItemRekapMengawas from "./ItemRekapMengawas";

export default function MainRekapMengawas({props}){
    const [isLoading,setLoading] = useState(true);
    const [rekap, setRekap] = useState(new Object);
    const [semester, setSemester] = useState(new Object);
    const [selectedData, setSelectedData] = useState(new Object);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [displayedRekap, setDisplayedRekap] = useState(new Object);

    useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
        try {
            const semester = await getSemester();
            const rekap = await getRekapMengawas(props.semester.id,"UTS");
        
            function compareByJumlah(a, b) {
                return a._count.idDosen - b._count.idDosen;
              }

            rekap.sort(compareByJumlah);

            setSelectedData({tipe:"UTS",semester:props.semester.id});
            setMaxPage(Math.ceil(rekap.length/10));
            setDisplayedRekap(rekap.slice(0,10));
            setSemester(semester);
            setRekap(rekap);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        fetchData();
    }, []);

    const onChangeSemester = async (e) => {
        const tempData = {...selectedData};
        tempData.semester = e.target.value;

        const rekapTemp = await getRekapMengawas(e.target.value,tempData.tipe);
        
        function compareByJumlah(a, b) {
            return a._count.idDosen - b._count.idDosen;
        }

        rekapTemp.sort(compareByJumlah);

        setRekap(rekapTemp);
        setSelectedData(tempData);
    }

    const onChangeTipe = async (e) => {
        const tempData = {...selectedData};
        tempData.tipe = e.target.value;

        const rekapTemp = await getRekapMengawas(tempData.semester,e.target.value);
        
        function compareByJumlah(a, b) {
            return a._count.idDosen - b._count.idDosen;
        }

        rekapTemp.sort(compareByJumlah);

        setRekap(rekapTemp);
        setSelectedData(tempData);
    }

    const nextPage = () => {
        var currentPage = page;
        if(currentPage<maxPage){
            currentPage++;
            setPage(currentPage);
            setDisplayedRekap(rekap.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const prevPage = () => {
        var currentPage = page;
        if(currentPage>1){
            currentPage--;
            setPage(currentPage);
            setDisplayedRekap(rekap.slice((currentPage-1)*10,((currentPage-1)*10)+10));
        }
    }

    const changeSearch = (e) => {
        setSearch(e.target.value);
    }


    if(isLoading){
        return <LoadingPengguna/>
    }
    
    return(
        <>
            <div className="table-responsive w-100">
                <h1>Rekap Mengawas</h1>
                <div className="d-flex flex-row py-1">
                    <div>
                        <FormSelect onChange={onChangeSemester}>
                            {semester.map((sem)=>(
                                sem.id==props.semester.id ? <option value={sem.id} selected>{sem.semester}</option> : <option value={sem.id}>{sem.semester}</option>
                            ))}
                        </FormSelect>
                    </div>
                    <div className="px-1">
                        <FormSelect onChange={onChangeTipe}>
                            <option value="UTS">UTS</option>
                            <option value="UAS">UAS</option>
                        </FormSelect>
                    </div>
                </div>
                <input className="form-control w-25" placeholder="Search" onChange={changeSearch}/>
                <div className="table-wrapper">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark">
                            <tr className="">    
                                <th className="text-center" style={{borderTopLeftRadius:'6px'}}>Nama Dosen</th>						
                                <th className="text-center">Jumlah Mengawas</th>
                            </tr>
                        </thead>
                        {search=="" ?
                        displayedRekap.map((rek)=>(
                            <ItemRekapMengawas rekap={rek}/>
                        ))
                        :
                        rekap.map((rek)=>(
                            rek.nama.toLowerCase().includes(search.toLowerCase()) ?
                            <ItemRekapMengawas rekap={rek}/>
                            :
                            null
                        ))
                        }
                    </table>
                </div>
                {search=="" && rekap.length > 10 ? 
                <div>
                    <button className="btn btn-primary" onClick={prevPage}>Prev</button>
                    <button className="btn btn-primary" onClick={nextPage}>Next</button>
                </div>
                :
                null
                }
            </div>
        </>
    )
}