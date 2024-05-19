"use server"
import db from '../../modules/db'

export async function getUser(){
    const allUser = await db.user.findMany({
        include:{
            role: true,
        }
    });

    return allUser;
}

export async function getUserById(idUser){
    const user = await db.user.findFirst({
        where:{
            id:String(idUser)
        },
        include:{
            role: true,
        }
    });

    return user;
}

export async function getUserAdmin(){
    const user = await db.user.findFirst({
        where:{
            role:{
                nama:"Admin",
            }
        },
        include:{
            role:true,
        }
    });

    return user;
}

export async function deleteUser(idUser){
    try{
        const user = await db.user.delete({
            where:{
                id:String(idUser)
            },
            include:{
                role: true,
            }
        });
        
        return true;
    }
    catch{
        return false;
    }
}

export async function addUser(formData){
    "use server"
    const emailUser = formData.get('email').toString();
    const NIKUser = formData.get('NIK').toString();
    const namaUser = formData.get('nama').toString();
    const jabatanUser = formData.get('jabatan').toString();
    try{
        await db.user.create({
            data:{
                email: emailUser,
                nik: NIKUser,
                nama: namaUser,
                idRole: String(jabatanUser),
            }
        });
        return true;
    }
    catch{
        return false;
    }
}

export async function editUser(formData, id){
    "use server"
    const emailUser = formData.get('email').toString();
    const NIKUser = formData.get('NIK').toString();
    const namaUser = formData.get('nama').toString();
    const jabatanUser = formData.get('jabatan').toString();
    try{
        await db.user.update({
            where:{
                id:String(id)
            },
            data:{
                email: emailUser,
                nik: NIKUser,
                nama: namaUser,
                idRole: String(jabatanUser),
            }
        });
        return true;
    }
    catch{
        return false;
    }
}