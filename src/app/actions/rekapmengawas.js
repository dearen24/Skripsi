"use server"
import db from '../../modules/db'

export async function getRekapMengawas(semester,masaujian){
    try{
        const rekap = await db.examRoomLec.groupBy({
            by:['idDosen'],
            where:{
                ujian:{
                    idSemester:String(semester),
                    tipe:String(masaujian),
                }
            },
            _count:{
                idDosen:true,
            },
        });

        for(let i = 0;i<rekap.length;i++){
            const dosen = await db.user.findFirst({
                where:{
                    id:rekap[i].idDosen,
                }
            });
            rekap[i].nama = dosen.nama
        }

        return rekap;

    }catch(err){
        console.log("Error mengambil rekap mengawas: ",err);
        return false
    }
    
    return rekap;
}