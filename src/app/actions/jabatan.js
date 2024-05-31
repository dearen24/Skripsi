"use server"
import db from '../../modules/db'

export async function getJabatan(){
    const allRole = await db.role.findMany();
    return allRole;
}

export async function getJabatanById(id){
    const role = await db.role.findFirst({
        where:{
            id:String(id)
        },
        include:{
            users:true
        }
    });

    return role;
}

export async function addJabatan(formData){
    "use server"
    const namaRole = formData.get('nama').toString();
    const kuotaMengawas = formData.get('kuotaMengawas').toString();
    try{
        await db.role.create({
            data:{
                nama: namaRole,
                kuotaMengawas: Number(kuotaMengawas),
            }
        });
        return true;
    }   
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}

export async function editJabatan(formData,id){
    const namaRole = formData.get('nama').toString();
    const kuotaMengawas = formData.get('kuotaMengawas').toString();
    
    try{
        await db.role.update({
            where:{
                id:String(id)
            },
            data:{
                nama: namaRole,
                kuotaMengawas: Number(kuotaMengawas)
            }
        });

        return true;
    } catch(err){
        console.error("Gagal Mengubah Pengguna ",err);
        return false;
    }
}

export async function deleteJabatan(idJabatan){
    try{
        const user = await db.role.delete({
            where:{
                id:String(idJabatan)
            }
        });
        return true;
    }
    catch{
        return false;
    }
}