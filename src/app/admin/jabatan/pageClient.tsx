"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";
import { getJabatan } from "@/app/actions/jabatan";

export default function HomePage(){
    const [isLoading,setLoading] = useState(true);
    const [jabatan, setJabatan] = useState(new Object);

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
            <div className="table-responsive w-100">
            <h1>Jabatan</h1>
            <Link href="/admin/jabatan/add">Tambah Jabatan</Link>
            <div className="table-wrapper">
                <table className="table table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th className="text-center">Nama</th>						
                            <th className="text-center">Kouta Mengawas</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {jabatan.map((role)=>(
                        <ItemJabatan key={role.id} jabatan={role}/>
                    ))}
                </table>
            </div>
        </div>  
        </>
    )

    // if(session?.status!=="unauthenticated"){
        // const elements = [];
        // if(data!==null){
        //     let size = Object.keys(data).length;
        //     for(let i = 0;i<size;i++){
        //         elements.push(
        //             <ItemDosen dosen={data[i]} nomor={JSON.stringify(i+1)}/>
        //         );
        //     }
        // }
        // return(
        //     <>
        //         {elements}
        //     </>
        // )
    // }else{
    //     if(typeof window !== 'undefined'){
    //         router.push('/');
    //     }
    // }
}

// const [data, setData] = useState(null);

//     useEffect(() => {
//         // Fetch data on component mount
//         const fetchData = async () => {
//           try {
//             const response = await fetch('api/user');
//             const result = await response.json();
//             setData(result);
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
    
//         fetchData();
//       }, []);