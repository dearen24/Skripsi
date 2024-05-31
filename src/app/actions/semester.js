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
        },
        include:{
            matkulujian:true,
            ujian:true,
            tukarjadwal:true,
            konsumsinonpengawas:true,
            rekapmengawas:true,
            gantijadwal:true,
        }
    });

    return role;
}

export async function getSemesterByNama(semester){
    const role = await db.semester.findFirst({
        where:{
            semester:String(semester)
        }
    });

    return role;
}

export async function getActiveSemester(){
    const semester = await db.semester.findFirst({
        where:{
            status:true,
        }
    });

    return semester;
}

export async function addSemester(semester){
    "use server"
    try{
        const sem = await db.semester.findFirst({
            where:{
                semester:semester,
            }
        });
        if(sem==null){
            await db.semester.create({
                data:{
                    semester: semester,
                    status: false,
                }
            });
        }
        return true;
    }   
    catch(err){
        console.error("Error menambahkan semester ",err);
        return false;
    }
}

export async function editSemester(id,status){
    try{
        await db.semester.update({
            where:{
                id:String(id)
            },
            data:{
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