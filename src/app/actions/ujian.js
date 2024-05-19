"use server"
import db from '../../modules/db'

export async function getUjian(){
    const allUjian = await db.exam.findMany({
        include:{
            matkul:true,
            semester:true,
            ujian:{
                select:{
                    ruangan:true,
                    dosen:true,
                }
            }
        }
        
    });

    return allUjian;
}

export async function getDatesBySemester(semester,masaujian){
    const dates = await db.exam.findMany({
        select:{
            date:true,
        },
        where:{
            idSemester:semester,
            tipe:masaujian
        },
        distinct:['date'],
    });

    return dates;
}

export async function getUjianBySemester(idSemester,tipe){
    const allUjian = await db.exam.findMany({
        where:{
            idSemester:String(idSemester),
            tipe:tipe,
        },
        orderBy:[
            {
                date:'asc',
            }
        ],
        include:{
            matkul:true,
            semester:true,
            ujian:{
                select:{
                    ruangan:true,
                    dosen:true,
                }
            }
        },
    });

    return allUjian;
}


// "Exam"."date" = ${date}::date AND "Exam"."tipe" = ${tipe} AND "Exam"."idSemester" = ${semester}

export async function getUjianRuanganDosen(){
    const allUjian = await db.examRoomLec.findMany({
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

    return allUjian;
}

export async function getUjianSemesterGroupByDate(idSemester){
    const allUjian = await db.exam.findMany({
        where:{
            idSemester:idSemester,
        },
        orderBy:[
            {
                date:'asc',
            }
        ]
    });
    
    return allUjian;
}

export async function getUjianById(id){
    const ujian = await db.exam.findFirst({
        where:{
            id:String(id)
        },
        include:{
            matkul: true,
            semester: true,
            ujian:{
                select:{
                    ruangan:true,
                }
            }
        }
    });

    return ujian;
}

export async function deleteUjian(id){
    try{
        const ujian = await db.exam.delete({
            where:{
                id:String(id)
            },
            include:{
                matkul: true,
                semester: true,
            }
        });
        
        return true;
    }
    catch(err){
        console.error("Error menghapus ujian ", err);
        return false;
    }
}

export async function addUjian(formData,mulai,selesai,maktkul){
    "use server"
    const semester = formData.get('semester').toString();
    const tipe = formData.get('tipeujian').toString();
    const metode = formData.get('metodeujian').toString();
    const shift = formData.get('shift').toString();
    const tanggal = new Date(formData.get('tanggal').toString()).toISOString();
    try{
        await db.exam.create({
            data:{
                idSemester: semester,
                date: tanggal,
                mulai: mulai,
                selesai: selesai,
                tipe: tipe,
                shift: Number(shift),
                metode: metode,
                matkul: {
                    connect:maktkul.map(id=>id),
                }
            }
        });
        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}



export async function editUjian(formData,mulai,selesai,matkul,id){
    "use server"
    const semester = formData.get('semester').toString();
    const tipe = formData.get('tipeujian').toString();
    const metode = formData.get('metodeujian').toString();
    const shift = formData.get('shift').toString();
    const tanggal = new Date(formData.get('tanggal').toString()).toISOString();
    try{
        await db.exam.update({
            where:{
                id:String(id)
            },
            data:{
                matkul: {
                    set: []
                }
        }});

        await db.exam.update({
            where:{
                id:String(id)
            },
            data:{
                idSemester: semester,
                date: tanggal,
                mulai: mulai,
                selesai: selesai,
                tipe: tipe,
                shift: Number(shift),
                metode: metode,
                matkul: {
                    connect:matkul.map(id=>id),
                }
            }
        });
        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}

export async function editRuanganUjian(id,ruangan){
    "use server"
    try{
        const ujian = await db.examRoomLec.findFirst({
            where:{
                idUjian:String(id)
            },
            
        });

        if(ujian==null){
            for(let i = 0;i<ruangan.length;i++){
                await db.examRoomLec.create({
                    data:{
                        idUjian:String(id),
                        idRuangan:ruangan[i].id,
                        snack:0,
                        lunch:0,
                    }
                });
            }
        }
        else{
            await db.examRoomLec.deleteMany({
                where:{
                    idUjian:String(id)
                }
            });

            for(let i = 0;i<ruangan.length;i++){
                await db.examRoomLec.create({
                    data:{
                        idUjian:String(id),
                        idRuangan:ruangan[i].id,
                        snack:0,
                        lunch:0,
                    }
                });
            }
        }

        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}

export async function addPengawasUjian(data){
    "use server"
    try{
        for(let i = 0;i<data.length;i++){
            for(let j = 0;j<data[i].ruangandosen.length;j++){
                await db.examRoomLec.deleteMany({
                    where:{
                        idUjian:String(data[i].id),
                        idRuangan:String(data[i].ruangandosen[j].id),
                    }
                });
            }

            for(let j = 0;j<data[i].ruangandosen.length;j++){
                if(data[i].ruangandosen[j].dosen.length!=0){
                    for(let k = 0;k<data[i].ruangandosen[j].dosen.length;k++){
                        await db.examRoomLec.create({
                            data:{
                                idUjian:String(data[i].id),
                                idRuangan:String(data[i].ruangandosen[j].id),
                                idDosen:String(data[i].ruangandosen[j].dosen[k].id),
                                snack:0,
                                lunch:0
                            }
                        })
                    }
                }
                else{
                    await db.examRoomLec.create({
                        data:{
                            idUjian:String(data[i].id),
                            idRuangan:String(data[i].ruangandosen[j].id),
                            idDosen:null,
                            snack:0,
                            lunch:0
                        }
                    })
                }
            }
        }

        return true;
    }
    catch(err){
        console.error("Error menambahkan pengguna ",err);
        return false;
    }
}

export async function getUjianByDateWaktu(date,waktuMulai,waktuSelesai,idUjian){
    try{
        const ujian = await db.exam.findMany({
            where:{
                OR:[
                    {
                        date:date,
                        mulai:{
                            gte:waktuMulai,
                            lte:waktuSelesai, 
                        },
                        selesai:{
                            gte:waktuMulai,
                            lte:waktuSelesai
                        }
                    },{
                        date:date,
                        mulai:{
                            lte:waktuMulai
                        },
                        selesai:{
                            gte:waktuSelesai
                        }
                    }
                ],
                id:{
                    not:idUjian
                }
            },
            include:{
                ujian:true
            }
        });

        return ujian
    }
    catch(err){
        console.error("Error Mengambil Data");
        return false;
    }
}