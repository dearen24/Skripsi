"use client"
import { useRouter } from "next/navigation"
import Image from "next/image";

export function EditButton(page){
    const router = useRouter();

    function handleClick(){
        if(page.page=="Dosen"){
            router.push("/admin/dosen/"+page.idDosen);
        }
        else if(page.page=="Jabatan"){
            router.push("/admin/jabatan/"+page.idJabatan);
        }
        else if(page.page=="Semester"){
            router.push("/admin/semester/"+page.idSemester);
        }
        else if(page.page=="Ruangan"){
            router.push("/admin/ruangan/"+page.idRuangan);
        }
        else if(page.page=="Mata Kuliah"){
            router.push("/admin/matkul/"+page.idMatkul);
        }
        else if(page.page=="Mata Kuliah Ujian"){
            router.push("/admin/matkulujian/"+page.idMatkulujian);
        }
        else if(page.page=="Ujian"){
            router.push("/admin/ujian/"+page.idUjian);
        }
        else if(page.page=="Ruangan Ujian"){
            router.push("/admin/aturruangan/"+page.idUjian);
        }
        else if(page.page=="Aturan Konsumsi"){
            router.push("/admin/aturankonsumsi/"+page.idAturan);
        }
    }

    return(
        <button className="btn btn-outline-primary mx-1" onClick={handleClick}>
            <Image src="/pencil-fill.svg" alt="Edit" width={20} height={20}/>
        </button>
    )
}