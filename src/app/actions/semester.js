"use server"
import db from '../../modules/db'

export async function getSemester(){
    const allSemester = await db.semester.findMany();
    return allSemester;
}

export async function getSemesterById(id){
    const role = await db.semester.findFirst({
        where:{
            id:String(id)
        }
    });

    return role;
}

export async function addSemester(formData){
    "use server"
    const namaSemester = formData.get('semester').toString();
    let status = false;
    if(formData.get('status').toString()=="Aktif"){
        status = true;
    }
    try{
        await db.semester.create({
            data:{
                semester: namaSemester,
                status: status,
            }
        });
        return true;
    }   
    catch(err){
        console.error("Error menambahkan semester ",err);
        return false;
    }
}

export async function editSemester(formData,id){
    const namaSemester = formData.get('semester').toString();
    let status = false;
    if(formData.get('status').toString()=="Aktif"){
        status=true;
    }
    
    try{
        await db.semester.update({
            where:{
                id:String(id)
            },
            data:{
                semester: namaSemester,
                status: status
            }
        });

        return true;
    } catch(err){
        console.error("Gagal Mengubah Semester ",err);
        return false;
    }
}

export async function deleteSemester(id){
    try{
        const user = await db.semester.delete({
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