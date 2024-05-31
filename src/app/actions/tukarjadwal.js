"use server"
import db from '../../modules/db'
import { getAllExamDateDosen, addKonsumsiDosen } from './konsumsi';

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
        const pertukaran = await db.historyTukar.findMany({
            where:{
                idUjianRuanganDosen1:String(filteredMyUjian[i].id)
            }
        });

        if(pertukaran.length!=0){
            for(let j = 0;j<pertukaran.length;j++){
                item.Dosen1 = filteredMyUjian[i];
                const otherUjian = await db.examRoomLec.findFirst({
                    where:{
                        id:pertukaran[j].idUjianRuanganDosen2,
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
                item.pertukaran = pertukaran[j];
                arr.push(item); 
            }
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
        const pertukaran = await db.historyTukar.findMany({
            where:{
                idUjianRuanganDosen1:String(filteredMyUjian[i].id),
                idSemester:String(idSemester)
            }
        });

        if(pertukaran.length!=0){
            for(let j = 0;j<pertukaran.length;j++){
                const item = new Object();
                item.Dosen1 = filteredMyUjian[i];
                const otherUjian = await db.examRoomLec.findFirst({
                    where:{
                        id:pertukaran[j].idUjianRuanganDosen2,
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
                item.pertukaran = pertukaran[j];
                arr.push(item); 
            }
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
        const pertukaran = await db.historyTukar.findMany({
            where:{
                idUjianRuanganDosen2:String(filteredMyUjian[i].id),
                idSemester:String(idSemester)
            }
        });

        if(pertukaran.length!=0){
            for(let j = 0;j<pertukaran.length;j++){
                const item = new Object();
                item.Dosen1 = filteredMyUjian[i];
                const otherUjian = await db.examRoomLec.findFirst({
                    where:{
                        id:pertukaran[j].idUjianRuanganDosen1,
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
                item.pertukaran = pertukaran[j];
                arr.push(item); 
            }
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

export async function getAllJadwal(semester,masaujian){
    const myUjian = await db.examRoomLec.findMany({
        where:{
            ujian:{
                tipe:masaujian,
                idSemester:semester
            },
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

    return myUjian;
}

export async function insertPertukaran(id1,id2,idSemester){
    try{
        await db.historyTukar.create({
            data:{
                idUjianRuanganDosen1:String(id1),
                idUjianRuanganDosen2:String(id2),
                statusDosen2:"Belum Disetujui",
                statusAdmin:"Belum Disetujui",
                idSemester:String(idSemester),
            }
        });

        return true;
    }
    catch(err){
        console.error("Error menambah pertukaran ",err);
        return false;
    }
}

export async function insertPertukaranAdmin(id1,id2,idSemester){
    try{
        await db.historyTukar.create({
            data:{
                idUjianRuanganDosen1:String(id1),
                idUjianRuanganDosen2:String(id2),
                statusDosen2:"Disetujui",
                statusAdmin:"Disetujui",
                idSemester:String(idSemester),
            }
        });

        return true;
    }
    catch(err){
        console.error("Error menambah pertukaran ",err);
        return false;
    }
}

export async function deletePertukaran(id){
    try{
        await db.historyTukar.delete({
            where:{
                id:id
            }
        })

        return true;
    }
    catch(err){
        console.error("Error menghapus pertukaran ",err);
        return false;
    }
}

export async function acceptPertukaran(id){
    try{
        await db.historyTukar.update({
            where:{
                id:id,
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

export async function rejectPertukaran(id){
    try{
        await db.historyTukar.update({
            where:{
                id:id,
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

export async function acceptPertukaranAdmin(id){
    try{
        await db.historyTukar.update({
            where:{
                id:id,
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

export async function rejectPertukaranAdmin(id){
    try{
        await db.historyTukar.update({
            where:{
                id:id,
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

export async function tukarJadwal(idJadwal1,idDosen1,idJadwal2,idDosen2,status){
    try{
        if(status){
            //tuker dosen dan set konsumsi jadi 0
            await db.examRoomLec.update({//ujian ini jadi punya dosen2
                where:{
                    id:String(idJadwal1),
                },
                data:{
                    idDosen:String(idDosen2),
                    snack:0,
                    lunch:0
                }
            })

            await db.examRoomLec.update({//ujian ini jadi punya dosen1
                where:{
                    id:String(idJadwal2),
                },
                data:{
                    idDosen:String(idDosen1),
                    snack:0,
                    lunch:0
                }
            })

            const ujianDosen1 = await db.examRoomLec.findFirst({
                where:{
                    id:String(idJadwal2),
                },
                include:{
                    ujian:true,
                }
            });

            const ujianDosen2 = await db.examRoomLec.findFirst({
                where:{
                    id:String(idJadwal1),
                },
                include:{
                    ujian:true,
                }
            });

        
            const aturan = await db.rules.findMany();
            const arrAturan = [];
            const arrDosen = [ujianDosen1,ujianDosen2];
            for(let i = 0;i<aturan.length;i++){//ambil dan masukin aturanya
                arrAturan.push({delapanSepuluh:aturan[i].delapanSepuluh,sepuluhDuaBelas:aturan[i].sepuluhDuaBelas,sebelasTigaBelas:aturan[i].sebelasTigaBelas,duaBelasDua:aturan[i].duaBelasDua,duaEmpat:aturan[i].duaEmpat});
            }
    
            for(let j = 0;j<arrDosen.length;j++){//loop untuk semua dosen yg ada
                const date = new Date(arrDosen[j].ujian.date).toISOString().substring(0,10);
                const dosen = await getAllExamDateDosen(date,arrDosen[j].idDosen);//ambil semua ujian punya dosen terseut
                let idUjianRuanganDosen = dosen[0].id;
                for(let k = 0;k<dosen.length;k++){//klo ada dosen yang lebih dari 1 kali, klo udh pernah dihitung ambil yg udh ada konsumsinya
                    if(dosen[k].lunch!=0||dosen[k].snack!=0){
                        idUjianRuanganDosen = dosen[k].id;
                    }
                }
                let konsumsiDosen = {delapanSepuluh:false,sepuluhDuaBelas:false,sebelasTigaBelas:false,duaBelasDua:false,duaEmpat:false};
                for(let k = 0;k<dosen.length;k++){//cocokin konsumsi dosen tersebut ke semua aturan sesuai jamnya dia ngawas
                    const mulai = new Date(dosen[k].ujian.mulai).toTimeString().substring(0,5);
                    const selesai = new Date(dosen[k].ujian.selesai).toTimeString().substring(0,5);
                    if(mulai=="08:00"&&selesai=="10:00"){
                        konsumsiDosen.delapanSepuluh = true;
                    }
                    if(mulai=="10:00"&&selesai=="12:00"){
                        konsumsiDosen.sepuluhDuaBelas = true;
                    }
                    if(mulai=="11:00"&&selesai=="13:00"){
                        konsumsiDosen.sebelasTigaBelas = true;
                    }
                    if(mulai=="12:00"&&selesai=="14:00"){
                        konsumsiDosen.duaBelasDua = true;
                    }
                    if(mulai=="14:00"&&selesai=="16:00"){
                        konsumsiDosen.duaEmpat = true;
                    }
                    if(mulai=="13:00"&&selesai=="15:00"){
                        konsumsiDosen.duaEmpat = true;
                    }
                }
                const index = arrAturan.findIndex(a=>a.delapanSepuluh==konsumsiDosen.delapanSepuluh&&a.sepuluhDuaBelas==konsumsiDosen.sepuluhDuaBelas&&
                    a.sebelasTigaBelas==konsumsiDosen.sebelasTigaBelas&&a.duaBelasDua==konsumsiDosen.duaBelasDua&&a.duaEmpat==konsumsiDosen.duaEmpat);
                if(index==-1){
                    return false;
                }
                const snack = aturan[index].snack;
                const lunch = aturan[index].lunch; 
                await addKonsumsiDosen(idUjianRuanganDosen,snack,lunch);
            }
        }
        else{
            //tuker dosen dan set konsumsi jadi 0
            await db.examRoomLec.update({//ujian ini jadi punya dosen2
                where:{
                    id:String(idJadwal1),
                },
                data:{
                    idDosen:String(idDosen2)
                }
            })

            await db.examRoomLec.update({//ujian ini jadi punya dosen1
                where:{
                    id:String(idJadwal2),
                },
                data:{
                    idDosen:String(idDosen1)
                }
            })
        }

        return true;
    }
    catch(err){
        console.error("Error menukar jadwal ",err);
        return false;
    }
}

export async function checkPendingJadwal(idUjianRuanganDosen,semester,masaujian){
    const item = new Object();
    const jadwal = await db.examRoomLec.findFirst({
        where:{
            id:idUjianRuanganDosen,
            ujian:{
                tipe:masaujian,
                idSemester:semester
            }
        },
    });

    item.jadwal = jadwal;

    const pending1 = await db.historyTukar.findFirst({
        where:{
            OR:[
                {
                    idSemester:semester,
                    idUjianRuanganDosen1:idUjianRuanganDosen,
                    statusDosen2:"Belum Disetujui",
                    statusDosen2:"Belum Disetujui",
                },
                {
                    idSemester:semester,
                    idUjianRuanganDosen1:idUjianRuanganDosen,
                    statusDosen2:"Disetujui",
                    statusDosen2:"Belum Disetujui",
                }
            ],
        }
    });

    const pending2 = await db.historyTukar.findFirst({
        where:{
            OR:[
                {
                    idSemester:semester,
                    idUjianRuanganDosen2:idUjianRuanganDosen,
                    statusDosen2:"Belum Disetujui",
                    statusDosen2:"Belum Disetujui",
                },
                {
                    idSemester:semester,
                    idUjianRuanganDosen2:idUjianRuanganDosen,
                    statusDosen2:"Disetujui",
                    statusDosen2:"Belum Disetujui",
                }
            ],
        }
    });

    item.pending1 = pending1;
    item.pending2 = pending2;

    return item;
}