"use server"
import db from '../../modules/db'

export async function getRuangan(){
    const allClass = await db.classroom.findMany();
    return allClass;
}

export async function getRuanganById(id){
    const role = await db.classroom.findFirst({
        where:{
            id:String(id)
        },
        include:{
            ujian:true
        }
    });

    return role;
}

export async function addRuangan(formData){
    "use server"
    const namaRuangan = formData.get('nama').toString();
    const kapasitas = formData.get('kapasitas').toString();

    try{
        await db.classroom.create({
            data:{
                nama: namaRuangan,
                kapasitas: Number(kapasitas),
            }
        });
        return true;
    }   
    catch(err){
        console.error("Error menambahkan ruangan ",err);
        return false;
    }
}

export async function editRuangan(formData,id){
    const namaRuangan = formData.get('nama').toString();
    const kapasitas = formData.get('kapasitas').toString();
    
    try{
        await db.classroom.update({
            where:{
                id:String(id)
            },
            data:{
                nama: namaRuangan,
                kapasitas: Number(kapasitas)
            }
        });

        return true;
    } catch(err){
        console.error("Error mengubah ruangan ",err);
        return false;
    }
}

export async function deleteRuangan(id){
    try{
        const classroom = await db.classroom.delete({
            where:{
                id:String(id)
            }
        });
        return true;
    }
    catch{
        return false;
    }
}