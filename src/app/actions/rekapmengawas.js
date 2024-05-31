"use server"
import db from '../../modules/db'

export async function createRekapMengawas(semester,masaujian){
    try{
        // const rekap = await db.examRoomLec.groupBy({
        //     by:['idDosen'],
        //     where:{
        //         ujian:{
        //             idSemester:String(semester),
        //             tipe:String(masaujian),
        //         }
        //     },
        //     _count:{
        //         idDosen:true,
        //     },
        // });

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

        const semesterSelected = await db.semester.findFirst({
            where:{
                id:semester
            }
        });

        let namaSemester = String(semesterSelected?.semester);
        let ganjilGenap = String(namaSemester.substring(0,6));
        let rekapMengawasSebelumnya = [];

        if(ganjilGenap.includes("Ganjil")&&masaujian=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11))-1;
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await db.semester.findFirst({
                where:{
                    semester:semesterSebelumnya,
                }
            });
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Ganjil")&&masaujian=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(7,11));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await db.semester.findFirst({
                where:{
                    semester:semesterSebelumnya,
                }
            });
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&masaujian=="UTS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Ganjil "+String(Number(tahunAjaran1))+"/"+String(Number(tahunAjaran2));
            const lastSemester = await db.semester.findFirst({
                where:{
                    semester:semesterSebelumnya,
                }
            });
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UAS");
            }
        }
        else if(ganjilGenap.includes("Genap")&&masaujian=="UAS"){
            let tahunAjaran1 = Number(namaSemester.substring(6,10));
            let tahunAjaran2 = tahunAjaran1+1;
            let semesterSebelumnya = "Genap "+String(tahunAjaran1)+"/"+String(tahunAjaran2);
            const lastSemester = await db.semester.findFirst({
                where:{
                    semester:semesterSebelumnya,
                }
            });
            if(lastSemester!=null){
                rekapMengawasSebelumnya = await getRekapMengawas(lastSemester.id,"UTS");
            }
        }

        if(rekapMengawasSebelumnya.length!=0){
            for(let i = 0;i<dosen.length;i++){
                const index = rekapMengawasSebelumnya.findIndex(a=>a.idDosen==dosen[i].id);
                if(index!=-1){
                    dosen[i].role.kuotaMengawas = rekapMengawasSebelumnya[index].kuotaSelanjutnya;
                }
            }
        }

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
            const nextKuota = dosen[i].role.kuotaMengawas - ((sisaMengawas-median)*-1);
            await db.rekapMengawas.create({
                data:{
                    idSemester:semester,
                    masaujian:masaujian,
                    idDosen:dosen[i].id,
                    kuota:Number(dosen[i].role.kuotaMengawas),
                    jumlahMengawas:Number(dosen[i].countMengawas),
                    sisaMengawas:Number(sisaMengawas),
                    kuotaSelanjutnya:Number(nextKuota),
                }
            });
        }

        return true;

    }catch(err){
        console.log("Error membuat rekap mengawas: ",err);
        return false
    }
}

export async function getRekapMengawas(semester,masaujian){
    try{
        const rekap = await db.rekapMengawas.findMany({
            where:{
                idSemester:semester,
                masaujian:masaujian
            },
            include:{
                semester:true,
            }
        });
        return rekap;
    }
    catch(err){
        console.error("Gagal mengambil rekap mengawas ",err);
        return false;
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