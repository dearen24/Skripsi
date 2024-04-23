"use client"
import Image from "next/image";
import { useState } from "react";
import { deleteUser } from "../../actions/user";
import DeleteConfirmationModal from "../modal/DeleteConfirmation";
import { deleteJabatan } from "@/app/actions/jabatan";
import { deleteSemester } from "@/app/actions/semester";
import { deleteRuangan } from "@/app/actions/ruangan";
import { deleteMatkul } from "@/app/actions/matkul";
import { deleteMatkulujian } from "@/app/actions/matkulujian";
import { deleteUjian } from "@/app/actions/ujian";
import { deleteAturanKonsumsi } from "@/app/actions/konsumsi";
import { deletePertukaran } from "@/app/actions/tukarjadwal";

export function DeleteButton(props){
    const [modal,setModal] = useState(false);

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);

    async function deleteData(){
        closeModal();
        if(props.page=="Dosen"){
            const response = await deleteUser(props.idDosen);
            for(let i = 0;i<props.pengguna.length;i++){
                if(props.pengguna[i]!=undefined){
                    if(props.pengguna[i].id==props.idDosen){
                        props.pengguna.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setPengguna(props.pengguna);
            }
            else{
                alert("Gagal Menghapus Pengguna");
            }
        }
        else if(props.page=="Jabatan"){
            const response = await deleteJabatan(props.idJabatan);
            for(let i = 0;i<props.jabatan.length;i++){
                if(props.jabatan[i]!=undefined){
                    if(props.jabatan[i].id==props.idJabatan){
                        props.jabatan.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setJabatan(props.jabatan);
            }
            else{
                alert("Gagal Menghapus Jabatan");
            }
        }
        else if(props.page=="Semester"){
            const response = await deleteSemester(props.idSemester);
            for(let i = 0;i<props.semester.length;i++){
                if(props.semester[i]!=undefined){
                    if(props.semester[i].id==props.idSemester){
                        props.semester.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setSemester(props.semester);
            }
            else{
                alert("Gagal Menghapus Semester");
            }
        }
        else if(props.page=="Ruangan"){
            const response = await deleteRuangan(props.idRuangan);
            for(let i = 0;i<props.ruangan.length;i++){
                if(props.ruangan[i]!=undefined){
                    if(props.ruangan[i].id==props.idRuangan){
                        props.ruangan.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setRuangan(props.ruangan);
            }
            else{
                alert("Gagal Menghapus Ruangan");
            }
        }
        else if(props.page=="Mata Kuliah"){
            const response = await deleteMatkul(props.idMatkul);
            for(let i = 0;i<props.matkul.length;i++){
                if(props.matkul[i]!=undefined){
                    if(props.matkul[i].id==props.idMatkul){
                        props.matkul.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setMatkul(props.matkul);
            }
            else{
                alert("Gagal Menghapus Mata Kuliah");
            }
        }
        else if(props.page=="Mata Kuliah Ujian"){
            const response = await deleteMatkulujian(props.idMatkulujian);
            for(let i = 0;i<props.matkulujian.length;i++){
                if(props.matkulujian[i]!=undefined){
                    if(props.matkulujian[i].id==props.idMatkulujian){
                        props.matkulujian.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setMatkulujian(props.matkulujian);
            }
            else{
                alert("Gagal Menghapus Mata Kuliah Ujian");
            }
        }
        else if(props.page=="Ujian"){
            const response = await deleteUjian(props.idUjian);
            for(let i = 0;i<props.ujian.length;i++){
                if(props.ujian[i]!=undefined){
                    if(props.ujian[i].id==props.idUjian){
                        props.ujian.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setUjian(props.ujian);
            }
            else{
                alert("Gagal Menghapus Ujian");
            }
        }
        else if(props.page=="Aturan Konsumsi"){
            const response = await deleteAturanKonsumsi(props.idAturan);
            for(let i = 0;i<props.aturan.length;i++){
                if(props.aturan[i]!=undefined){
                    if(props.aturan[i].id==props.idAturan){
                        props.aturan.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setAturan(props.aturan);
            }
            else{
                alert("Gagal Menghapus Aturan Konsumsi");
            }
        }
        else if(props.page=="Pertukaran Jadwal"){
            const response = await deletePertukaran(props.idPertukaran1,props.idPertukaran2);
            for(let i = 0;i<props.pertukaran.length;i++){
                if(props.pertukaran[i]!=undefined){
                    if(props.pertukaran[i].Dosen1.id==props.idPertukaran1&&props.pertukaran[i].Dosen2.id==props.idPertukaran2){
                        props.pertukaran.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setPertukaran(props.pertukaran);
            }
            else{
                alert("Gagal Menghapus Pertukaran Jadwal");
            }
        }
    }
    
    return(
        <>
            <button className="btn btn-outline-danger mx-1" id="livaToastBtn" onClick={openModal}>
                <Image src="/trash-fill.svg" alt="Delete" width={20} height={20}/>
            </button>

            <DeleteConfirmationModal modal={modal} closeModal={closeModal} deleteData={deleteData} page={props.page} />
        </>
    )
}