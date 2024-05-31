"use server"
import db from '../../modules/db'
import { getUserById } from './user';

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

export async function gantiJadwal(idUjianRuanganDosen,idDosenDigantikan,idDosenMenggantikan,idSemester){
    try{
        await db.historyGanti.create({
            data:{
                idUjianRuanganDosen:String(idUjianRuanganDosen),
                idDosenDigantikan:String(idDosenDigantikan),
                idDosenMenggantikan:String(idDosenMenggantikan),
                idSemester:String(idSemester),
            }
        });

        await db.examRoomLec.update({
            where:{
                id:idUjianRuanganDosen,
            },
            data:{
                idDosen:String(idDosenMenggantikan)
            }
        });

        return true;
    }
    catch(err){
        console.error("Gagal membuat pergantian: ",err);
        return false
    }
}