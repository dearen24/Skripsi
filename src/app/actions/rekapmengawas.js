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

        const dosen = await db.user.findMany({
            where:{
                role:{
                    nama:{
                        not:"Admin",
                    }
                }
            },
            include:{
                role:true,
            }
        });

        for(let i = 0;i<dosen.length;i++){
            const ujian = await db.examRoomLec.findMany({
                where:{
                    idDosen:dosen[i].id,
                    ujian:{
                        idSemester:semester,
                        tipe:masaujian,
                    }
                }
            });
            dosen[i].countMengawas = ujian.length;
        }

        let arrCountMengawasDosen = [];
        for(let i = 0;i<dosen.length;i++){
            const sisaMengawas = dosen[i].role.kuotaMengawas - dosen[i].countMengawas;
            arrCountMengawasDosen.push(sisaMengawas);
        }
        
        let median = findMedian(arrCountMengawasDosen);

        for(let i = 0;i<dosen.length;i++){
            const sisaMengawas = dosen[i].role.kuotaMengawas - dosen[i].countMengawas;
            dosen[i].nextKuota = dosen[i].role.kuotaMengawas - ((sisaMengawas-median)*-1);
        }

        for(let i = 0;i<rekap.length;i++){
            const dosen = await db.user.findFirst({
                where:{
                    id:rekap[i].idDosen,
                }
            });
            rekap[i].nama = dosen.nama
        }

        return dosen;

    }catch(err){
        console.log("Error mengambil rekap mengawas: ",err);
        return false
    }
}

//Median
function findMedian(arr) {
    arr.sort((a, b) => a - b);
    const middleIndex = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
        return (arr[middleIndex - 1] + arr[middleIndex]) / 2;
    } else {
        return arr[middleIndex];
    }
} 

//Mode
function findModus(arr) {
    arr.sort((a, b) => a - b);
    let count = 1;
    let maxCount = 1;
    let mode = -1;
    for(let i = 1;i<arr.length;i++){
        if(arr[i]==arr[i-1]){
            count++;
        }
        else{
            if(count>maxCount){
                maxCount = count;
                mode = arr[i];
            }
            count = 1;
        }
    }

    if(count>maxCount){
        mode = arr[arr.length-1];
    }

    return mode;
}