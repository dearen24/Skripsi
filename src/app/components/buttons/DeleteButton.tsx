"use client"
import Image from "next/image";
import { useState } from "react";
import { deleteUser, getUserById } from "../../actions/user";
import DeleteConfirmationModal from "../modal/DeleteConfirmation";
import { deleteJabatan, getJabatanById } from "@/app/actions/jabatan";
import { deleteSemester, getSemesterById } from "@/app/actions/semester";
import { deleteRuangan, getRuanganById } from "@/app/actions/ruangan";
import { deleteMatkul, getMatkulById } from "@/app/actions/matkul";
import { deleteMatkulujian, getMatkulujianById } from "@/app/actions/matkulujian";
import { deleteUjian, getUjianById } from "@/app/actions/ujian";
import { deleteAturanKonsumsi, deleteKonsumsiNonPengawas, getAturanKonsumsiById } from "@/app/actions/konsumsi";
import { deletePertukaran } from "@/app/actions/tukarjadwal";
import ModalFailDeleteItem from "../modal/FailDeleteItem";

export function DeleteButton(props){
    const [modal,setModal] = useState(false);
    const [modalFailed,setModalFailed] = useState(false);

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    const closeModalFailed = () => setModalFailed(false);
    const openModalFailed = () => setModalFailed(true);

    async function deleteData(){
        closeModal();
        if(props.page=="Dosen"){
            const dosen = await getUserById(props.idDosen);
            if(dosen?.dosenMengajar.length!=0||dosen.mengawas.length!=0||dosen.rekapMengawas.length!=0){
                openModalFailed();
            }
            else{
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
        }
        else if(props.page=="Jabatan"){
            const jabatan = await getJabatanById(props.idJabatan);
            if(jabatan?.users.length!=0){
                openModalFailed();
            }
            else{
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
        }
        else if(props.page=="Semester"){
            const semester = await getSemesterById(props.idSemester);
            if(semester?.matkulujian.length!=0||semester.ujian.length!=0||semester.tukarjadwal.length!=0||semester.gantijadwal.length!=0||semester.konsumsinonpengawas.length!=0||semester.rekapmengawas.length!=0){
                openModalFailed();
            }
            else{
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
        }
        else if(props.page=="Ruangan"){
            const ruangan = await getRuanganById(props.idRuangan);
            if(ruangan?.ujian.length!=0){
                openModalFailed();
            }
            else{
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
        }
        else if(props.page=="Mata Kuliah"){
            const matkul = await getMatkulById(props.idMatkul);
            if(matkul?.matkulujian.length!=0||matkul.ujian.length!=0){
                openModalFailed();
            }
            else{
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
            const ujian = await getUjianById(props.idUjian);
            if(ujian?.ujian.length!=0){
                openModalFailed();
            }
            else{
                const response = await deleteUjian(props.idUjian);
                for(let i = 0;i<props.ujian.length;i++){
                    for(let j = 0;j<props.ujian[i].length;j++){
                        if(props.ujian[i][j]!=undefined){
                            if(props.ujian[i][j].id==props.idUjian){
                                props.ujian[i].splice(j,1);
                            }
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
            const response = await deletePertukaran(props.idPertukaran);
            for(let i = 0;i<props.pertukaran.length;i++){
                if(props.pertukaran[i]!=undefined){
                    if(props.pertukaran[i].pertukaran.id==props.idPertukaran){
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
        else if(props.page=="Konsumsi Non-Pengawas"){
            const response = await deleteKonsumsiNonPengawas(props.idKonsumsi);
            for(let i = 0;i<props.konsumsi.length;i++){
                if(props.konsumsi[i]!=undefined){
                    if(props.konsumsi[i].id==props.idKonsumsi){
                        props.konsumsi.splice(i,1);
                    }
                }
            }
            if(response==true){
                props.setKonsumsi(props.konsumsi);
            }
            else{
                alert("Gagal Menghapus Konsumsi Non-Pengawas");
            }
        }
    }
    
    return(
        <>
            <button className="btn btn-danger mx-1" id="livaToastBtn" onClick={openModal} style={{border:"2px solid black"}}>
                <Image src="/trash-fill.svg" alt="Delete" width={20} height={20}/>
            </button>

            <ModalFailDeleteItem modal={modalFailed} closeModal={closeModalFailed} page={props.page}/>
            <DeleteConfirmationModal modal={modal} closeModal={closeModal} deleteData={deleteData} page={props.page} />
        </>
    )
}