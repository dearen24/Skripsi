"use server"
import db from '../../modules/db'

export async function getAturanKonsumsi(){
    try{
        const aturan = await db.rules.findMany({
            select:{
                sebelum12:true,
                melewati12:true,
                setelah12:true,
                konsumsi:true,
            }
        });
        return aturan;
    }
    catch{
        return false;
    }
}

export async function getAturanKonsumsiAll(){
    try{
        const aturan = await db.rules.findMany();
        return aturan;
    }
    catch{
        return false;
    }
}

export async function getAturanKonsumsiById(id){
    try{
        const aturan = await db.rules.findFirst({
            where:{
                id:String(id),
            }
        });
        return aturan;
    }
    catch{
        return false;
    }
}

export async function addAturanKonsumsi(formData){
    const sebelum12 = formData.get("sebelum12").toString();
    const melewati12 = formData.get("melewati12").toString();
    const setelah12 = formData.get("setelah12").toString();
    const konsumsi = formData.get("konsumsi").toString();
    try{
        await db.rules.create({
            data:{
                sebelum12:Boolean(sebelum12),
                melewati12:Boolean(melewati12),
                setelah12:Boolean(setelah12),
                konsumsi:String(konsumsi)
            }
        });
        return true;
    }
    catch(err){
        console.error("Gagal menambahkan Aturan Konsumsi: ",err);
        return false;
    }
}

export async function editAturanKonsumsi(formData,id){
    const sebelum12 = formData.get("sebelum12").toString();
    const melewati12 = formData.get("melewati12").toString();
    const setelah12 = formData.get("setelah12").toString();
    const konsumsi = formData.get("konsumsi").toString();
    try{
        await db.rules.update({
            where:{
                id:String(id),
            },
            data:{
                sebelum12:{
                    set:Boolean(sebelum12)
                },
                melewati12:{
                    set:Boolean(melewati12)
                },
                setelah12:{
                    set:Boolean(setelah12)
                },
                konsumsi:String(konsumsi)
            }
        });
        return true;
    }
    catch(err){
        console.error("Gagal menambahkan Aturan Konsumsi: ",err);
        return false;
    }
}

export async function deleteAturanKonsumsi(idAturan){
    try{
        await db.rules.delete({
            where:{
                id:String(idAturan),
            }
        });
        return true;
    }
    catch(err){
        console.error("Gagal menghapus Aturan Konsumsi: ",err);
        return false;
    }
}



export async function getAllExamDate(date){
    try{
        const ujian = await db.examRoomLec.findMany({
            where:{
                ujian:{date:new Date(date)}
            },
            include:{
                dosen:true,
            }
        });
        return ujian;
    }
    catch(err){
        console.error(err);
        return false;
    }
}

export async function getAllExamDateDosen(date,dosen){
    try{
        const ujian = await db.examRoomLec.findMany({
            where:{
                ujian:{
                    date:new Date(date),
                },
                idDosen:String(dosen),
            },
            include:{
                ujian:true,
            }
        });
        return ujian;
    }
    catch(err){
        console.error(err);
        return false;
    }
}

export async function addKonsumsiDosen(idUjianRuanganDosen,konsumsi){
    try{
        
        if(konsumsi=="lunch"){
            await db.examRoomLec.update({
                where:{
                    id:String(idUjianRuanganDosen),
                },
                data:{
                    lunch:1,
                }
            })
        }
        else if(konsumsi=="snack"){
            await db.examRoomLec.update({
                where:{
                    id:String(idUjianRuanganDosen),
                },
                data:{
                    snack:1,
                }
            })
        }
        return ujian;
    }
    catch(err){
        console.error(err);
        return false;
    }
}