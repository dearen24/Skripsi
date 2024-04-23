"use server"
import db from '../../modules/db'

export async function getMatkul(){
    const allMatkul = await db.subject.findMany();
    return allMatkul;
}

export async function getMatkulById(id){
    const matkul = await db.subject.findFirst({
        where:{
            id:String(id)
        }
    });

    return matkul;
}

export async function addMatkul(formData){
    "use server"
    const namaMatkul = formData.get('nama').toString();
    const kodeMatkul = formData.get('kode').toString();
    
    try{
        await db.subject.create({
            data:{
                nama: namaMatkul,
                kode: kodeMatkul,
            }
        });
        return true;
    }   
    catch(err){
        console.error("Error menambahkan semester ",err);
        return false;
    }
}

export async function editMatkul(formData,id){
    const namaMatkul = formData.get('nama').toString();
    const kodeMatkul = formData.get('kode').toString();
    
    try{
        await db.subject.update({
            where:{
                id:String(id)
            },
            data:{
                nama: namaMatkul,
                kode: kodeMatkul
            }
        });

        return true;
    } catch(err){
        console.error("Gagal Mengubah Semester ",err);
        return false;
    }
}

export async function deleteMatkul(id){
    try{
        const matkul = await db.subject.delete({
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