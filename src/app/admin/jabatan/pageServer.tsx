import { authConfig, loginRequiredServer } from "@/modules/auth";
import { getServerSession } from "next-auth";
import db from "@/modules/db";
import Link from "next/link";
import ItemJabatan from "@/app/components/jabatan/ItemJabatan";

const waitTime = (ms:number) => new Promise((rs)=>setTimeout(rs,ms));

export default async function HomePage(){
    await loginRequiredServer();
    const session = await getServerSession(authConfig);

    const allRole = await db.role.findMany();

    await waitTime(1000);

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
                    {allRole.map((role)=>(
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