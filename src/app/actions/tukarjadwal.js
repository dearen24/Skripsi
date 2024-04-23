"use server"
import db from '../../modules/db'

export async function getAllPengajuan(idSemester,tipe){
    const myUjian = await db.examRoomLec.findMany({
        include:{
            ujian:{
                include:{
                    matkul:true,
                }
            },
            ruangan:true,
            dosen:true,
        }
    });

    const arr = [];

    const filteredMyUjian = myUjian.filter((ujian)=>ujian.ujian.idSemester==idSemester && ujian.ujian.tipe==tipe); 

    for(let i = 0;i<filteredMyUjian.length;i++){
        const item = new Object()
        const pertukaran = await db.historyTukar.findFirst({
            where:{
                idUjianRuanganDosen1:String(filteredMyUjian[i].id),
                idSemester:String(idSemester)
            }
        });

        if(pertukaran!=null){
            item.Dosen1 = filteredMyUjian[i];
            const otherUjian = await db.examRoomLec.findFirst({
                where:{
                    id:pertukaran.idUjianRuanganDosen2,
                },
                include:{
                    ujian:{
                        include:{
                            matkul:true,
                        }
                    },
                    ruangan:true,
                    dosen:true,
                }
            });
            item.Dosen2 = otherUjian;
            item.pertukaran = pertukaran;
            arr.push(item); 
        }
    }

    return arr;
}

export async function getMyPengajuan(idDosen,idSemester,tipe){
    const myUjian = await db.examRoomLec.findMany({
        where:{
            idDosen:idDosen,
        },
        include:{
            ujian:{
                include:{
                    matkul:true,
                }
            },
            ruangan:true,
            dosen:true,
        }
    });

    const filteredMyUjian = myUjian.filter((ujian)=>ujian.ujian.idSemester==idSemester && ujian.ujian.tipe==tipe); 

    const arr = [];

    for(let i = 0;i<filteredMyUjian.length;i++){
        const item = new Object()
        const pertukaran = await db.historyTukar.findFirst({
            where:{
                idUjianRuanganDosen1:String(filteredMyUjian[i].id),
                idSemester:String(idSemester)
            }
        });

        if(pertukaran!=null){
            item.Dosen1 = filteredMyUjian[i];
            const otherUjian = await db.examRoomLec.findFirst({
                where:{
                    id:pertukaran.idUjianRuanganDosen2,
                },
                include:{
                    ujian:{
                        include:{
                            matkul:true,
                        }
                    },
                    ruangan:true,
                    dosen:true,
                }
            });
            item.Dosen2 = otherUjian;
            item.pertukaran = pertukaran;
            arr.push(item); 
        }
    }

    return arr;
}

export async function getOtherPengajuan(idDosen,idSemester,tipe){
    const myUjian = await db.examRoomLec.findMany({
        where:{
            idDosen:idDosen,
        },
        include:{
            ujian:{
                include:{
                    matkul:true,
                }
            },
            ruangan:true,
            dosen:true,
        }
    });

    const filteredMyUjian = myUjian.filter((ujian)=>ujian.ujian.idSemester==idSemester && ujian.ujian.tipe==tipe);

    const arr = [];

    for(let i = 0;i<filteredMyUjian.length;i++){
        const item = new Object()
        const pertukaran = await db.historyTukar.findFirst({
            where:{
                idUjianRuanganDosen2:String(filteredMyUjian[i].id),
                idSemester:String(idSemester)
            }
        });

        if(pertukaran!=null){
            item.Dosen1 = filteredMyUjian[i];
            const otherUjian = await db.examRoomLec.findFirst({
                where:{
                    id:pertukaran.idUjianRuanganDosen1,
                },
                include:{
                    ujian:{
                        include:{
                            matkul:true,
                        }
                    },
                    ruangan:true,
                    dosen:true,
                }
            });
            item.Dosen2 = otherUjian;
            item.pertukaran = pertukaran;
            arr.push(item); 
        }
    }

    return arr;
}

export async function getMyJadwal(idDosen,idSemester){
    const myUjian = await db.examRoomLec.findMany({
        where:{
            idDosen:idDosen,
        },
        include:{
            ujian:{
                include:{
                    matkul:true,
                }
            },
            ruangan:true,
            dosen:true,
        }
    });

    const ujianSemester = myUjian.filter((ujian)=>ujian.ujian.idSemester==idSemester);

    return ujianSemester;
}

export async function getOtherJadwal(idDosen,idSemester){
    const myUjian = await db.examRoomLec.findMany({
        include:{
            ujian:{
                include:{
                    matkul:true,
                }
            },
            ruangan:true,
            dosen:true,
        }
    });

    const ujianSemester = myUjian.filter((ujian)=>ujian.ujian.idSemester==idSemester && ujian.idDosen!=idDosen);

    return ujianSemester;
}

export async function insertPertukaran(id1,id2,idSemester){
    await db.historyTukar.create({
        data:{
            idUjianRuanganDosen1:String(id1),
            idUjianRuanganDosen2:String(id2),
            statusDosen2:"Belum Disetujui",
            statusAdmin:"Belum Disetujui",
            idSemester:String(idSemester),
        }
    });
}

export async function deletePertukaran(id1,id2){
    try{
        await db.historyTukar.delete({
            where:{
                idUjianRuanganDosen1_idUjianRuanganDosen2:{
                    idUjianRuanganDosen1:String(id1),
                    idUjianRuanganDosen2:String(id2),
                }
            }
        })

        return true;
    }
    catch(err){
        console.error("Error menghapus pertukaran ",err);
        return false;
    }
}

export async function acceptPertukaran(id1,id2){
    try{
        await db.historyTukar.update({
            where:{
                idUjianRuanganDosen1_idUjianRuanganDosen2:{
                    idUjianRuanganDosen1:String(id1),
                    idUjianRuanganDosen2:String(id2),
                }
            },
            data:{
                statusDosen2:"Disetujui"
            }
        })

        return true;
    }
    catch(err){
        console.error("Error mengubah pertukaran ",err);
        return false;
    }
}

export async function rejectPertukaran(id1,id2){
    try{
        await db.historyTukar.update({
            where:{
                idUjianRuanganDosen1_idUjianRuanganDosen2:{
                    idUjianRuanganDosen1:String(id1),
                    idUjianRuanganDosen2:String(id2),
                }
            },
            data:{
                statusDosen2:"Ditolak"
            }
        })

        return true;
    }
    catch(err){
        console.error("Error mengubah pertukaran ",err);
        return false;
    }
}

export async function acceptPertukaranAdmin(id1,id2){
    try{
        await db.historyTukar.update({
            where:{
                idUjianRuanganDosen1_idUjianRuanganDosen2:{
                    idUjianRuanganDosen1:String(id1),
                    idUjianRuanganDosen2:String(id2),
                }
            },
            data:{
                statusAdmin:"Disetujui"
            }
        })

        return true;
    }
    catch(err){
        console.error("Error mengubah pertukaran ",err);
        return false;
    }
}

export async function rejectPertukaranAdmin(id1,id2){
    try{
        await db.historyTukar.update({
            where:{
                idUjianRuanganDosen1_idUjianRuanganDosen2:{
                    idUjianRuanganDosen1:String(id1),
                    idUjianRuanganDosen2:String(id2),
                }
            },
            data:{
                statusAdmin:"Ditolak"
            }
        })

        return true;
    }
    catch(err){
        console.error("Error mengubah pertukaran ",err);
        return false;
    }
}

export async function tukarJadwal(idJadwal1,idDosen1,idJadwal2,idDosen2){
    try{
        await db.examRoomLec.update({
            where:{
                id:String(idJadwal1),
            },
            data:{
                idDosen:String(idDosen2),
            }
        })

        await db.examRoomLec.update({
            where:{
                id:String(idJadwal2),
            },
            data:{
                idDosen:String(idDosen1),
            }
        })

        return true;
    }
    catch(err){
        console.error("Error menukar jadwal ",err);
        return false;
    }
}