"use server"
import db from '../../modules/db'
import { getUserById } from './user';
import { getAllExamDateDosen, addKonsumsiDosen } from './konsumsi';

export async function getPergantianJadwal(semester,masaujian){
    try{
        const jadwal = await db.historyGanti.findMany();

        let arrUjian = [];
        for(let i = 0;i<jadwal.length;i++){
            const ujian = await db.examRoomLec.findFirst({
                where:{
                    id:String(jadwal[i].idUjianRuanganDosen),
                    ujian:{
                        idSemester:String(semester),
                        tipe:String(masaujian),
                    }
                },
                include:{
                    ujian:{
                        include:{
                            matkul:true,
                        }
                    },
                    dosen:true,
                    ruangan:true,
                }
            });

            if(ujian!=null){
                const dosenDigantikan = await getUserById(jadwal[i].idDosenDigantikan);
                ujian.dosenDigantikan = dosenDigantikan.nama;
                arrUjian.push(ujian);
            }
        }

        return arrUjian;
    }
    catch(err){
        console.error("Gagal mengambil History Ganti: ",err);
        return false
    }
}

export async function gantiJadwal(idJadwal,idDosenDigantikan,idDosenMenggantikan,idSemester){
    try{
        await db.historyGanti.create({
            data:{
                idUjianRuanganDosen:String(idJadwal),
                idDosenDigantikan:String(idDosenDigantikan),
                idDosenMenggantikan:String(idDosenMenggantikan),
                idSemester:String(idSemester),
            }
        });

        await db.examRoomLec.update({
            where:{
                id:idJadwal,
            },
            data:{
                idDosen:String(idDosenMenggantikan)
            }
        });

        const dateUjian = await db.examRoomLec.findFirst({//ambil tanggal jadwal1
            select:{
                ujian:{
                    select:{
                        date:true,
                    }
                },
            },
            where:{
                id:idJadwal
            }
        });

        const ujianDosenSebelumnya = await db.examRoomLec.findFirst({
            where:{
                idDosen:idDosenDigantikan,
                ujian:{
                    date:dateUjian.ujian.date
                }
            },
            include:{
                ujian:true,
            }
        });

        const aturan = await db.rules.findMany();
        const arrAturan = [];
        const arrDosen = [];
        if(ujianDosenSebelumnya!=null) arrDosen.push(ujianDosenSebelumnya);
        for(let i = 0;i<aturan.length;i++){//ambil dan masukin aturanya
            arrAturan.push({delapanSepuluh:aturan[i].delapanSepuluh,sepuluhDuaBelas:aturan[i].sepuluhDuaBelas,sebelasTigaBelas:aturan[i].sebelasTigaBelas,duaBelasDua:aturan[i].duaBelasDua,duaEmpat:aturan[i].duaEmpat});
        }

        for(let j = 0;j<arrDosen.length;j++){//loop untuk semua dosen yg ada
            const date = new Date(arrDosen[j].ujian.date).toISOString().substring(0,10);
            const dosen = await getAllExamDateDosen(date,arrDosen[j].idDosen);//ambil semua ujian punya dosen terseut
            let idUjianRuanganDosen = dosen[0].id;
            for(let k = 0;k<dosen.length;k++){//klo ada dosen yang lebih dari 1 kali, klo udh pernah dihitung ambil yg udh ada konsumsinya
                if(dosen[k].lunch!=0||dosen[k].snack!=0){
                    idUjianRuanganDosen = dosen[k].id;
                }
            }
            let konsumsiDosen = {delapanSepuluh:false,sepuluhDuaBelas:false,sebelasTigaBelas:false,duaBelasDua:false,duaEmpat:false};
            for(let k = 0;k<dosen.length;k++){//cocokin konsumsi dosen tersebut ke semua aturan sesuai jamnya dia ngawas
                const mulai = new Date(dosen[k].ujian.mulai).toTimeString().substring(0,5);
                const selesai = new Date(dosen[k].ujian.selesai).toTimeString().substring(0,5);
                if(mulai=="08:00"&&selesai=="10:00"){
                    konsumsiDosen.delapanSepuluh = true;
                }
                if(mulai=="10:00"&&selesai=="12:00"){
                    konsumsiDosen.sepuluhDuaBelas = true;
                }
                if(mulai=="11:00"&&selesai=="13:00"){
                    konsumsiDosen.sebelasTigaBelas = true;
                }
                if(mulai=="12:00"&&selesai=="14:00"){
                    konsumsiDosen.duaBelasDua = true;
                }
                if(mulai=="14:00"&&selesai=="16:00"){
                    konsumsiDosen.duaEmpat = true;
                }
                if(mulai=="13:00"&&selesai=="15:00"){
                    konsumsiDosen.duaEmpat = true;
                }
            }
            const index = arrAturan.findIndex(a=>a.delapanSepuluh==konsumsiDosen.delapanSepuluh&&a.sepuluhDuaBelas==konsumsiDosen.sepuluhDuaBelas&&
                a.sebelasTigaBelas==konsumsiDosen.sebelasTigaBelas&&a.duaBelasDua==konsumsiDosen.duaBelasDua&&a.duaEmpat==konsumsiDosen.duaEmpat);
            if(index==-1){
                return false;
            }
            const snack = aturan[index].snack;
            const lunch = aturan[index].lunch; 
            await addKonsumsiDosen(idUjianRuanganDosen,snack,lunch);
        }

        return true;
    }
    catch(err){
        console.error("Gagal membuat pergantian: ",err);
        return false
    }
}