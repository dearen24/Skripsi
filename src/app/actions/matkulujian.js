"use server"
import db from '../../modules/db'

export async function getMatkulUjian(){
    const allMatkulujian = await db.examSubject.findMany({
        include:{
            matkul: true,
            semester: true,
            dosenPengajar: true,
        }
    });

    return allMatkulujian;
}

export async function getMatkulUjianBySemester(idSemester){
    const allMatkulujian = await db.examSubject.findMany({
        where:{
            idSemester:String(idSemester),
        },
        include:{
            matkul: true,
            semester: true,
            dosenPengajar: true,
        }
    });

    return allMatkulujian;
}

export async function getMatkulujianById(id){
    const matkulujian = await db.examSubject.findFirst({
        where:{
            id:String(id)
        },
        include:{
            matkul: true,
            semester: true,
            dosenPengajar: true,
        }
    });

    return matkulujian;
}

export async function getMatkulujianByMatkulId(id,semester){
    const matkulujian = await db.examSubject.findFirst({
        where:{
            idMatkul:String(id),
            idSemester:semester
        },
        include:{
            dosenPengajar: true,
        }
    });

    return matkulujian;
}

export async function deleteMatkulujian(idUser){
    try{
        const matkulujian = await db.examSubject.delete({
            where:{
                id:String(idUser)
            },
            include:{
                matkul: true,
                semester: true,
                dosenPengajar: true,
            }
        });
        
        return true;
    }
    catch{
        return false;
    }
}

export async function addMatkulujian(formData,dosen){
    "use server"
    const semester = formData.get('semester').toString();
    const matkul = formData.get('matkul').toString();
    const peserta = formData.get('jumlahpeserta').toString();
    try{
        await db.examSubject.create({
            data:{
                idSemester: semester,
                idMatkul: matkul,
                peserta: Number(peserta),
                dosenPengajar: {
                    connect: dosen.map(id=>id),
            }
        }});
        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}

export async function editMatkulujian(formData,id,dosen){
    "use server"
    const semester = formData.get('semester').toString();
    const matkul = formData.get('matkul').toString();
    const peserta = formData.get('jumlahpeserta').toString();
    try{
        await db.examSubject.update({
            where:{
                id:String(id)
            },
            data:{
                dosenPengajar: {
                    set: []
                }
        }});

        await db.examSubject.update({
            where:{
                id:String(id)
            },
            data:{
                idSemester: semester,
                idMatkul: matkul,
                peserta: Number(peserta),
                dosenPengajar: {
                    connect: dosen.map(id=>id),
            }
        }});
        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}