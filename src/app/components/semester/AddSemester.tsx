"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addSemester, getActiveSemester } from "@/app/actions/semester";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import ModalMultipleActiveSemesterAlert from "../modal/MultipleActiveSemester";

export default function AddSemester(){
    const [modal,setModal] = useState(false);
    const [modalSemester,setModalSemester] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    const closeModalSemester = () => setModalSemester(false);
    const openModalSemester = () => setModalSemester(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const backToHomepage = () => router.push("/admin/semester");

    const add = async (formData:FormData) => {
        const activeSemester = await getActiveSemester();
        if(activeSemester!=null&&formData.get("status")?.toString()=="Aktif"){
            openModalSemester();
        }
        else{
            const response = await addSemester(formData);
            if(response==true){
                ref.current?.reset();
                openModal();
                openToast();
            }
            else{
                alert("Gagal menambahkan jabatan");
            }
        }
    }

    return(
        <>  
            <div>
                <div>
                    <h1>Tambah Semester</h1>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Semester</label>
                                    <input type="text" name="semester" className="form-control" placeholder="Masukan Nama Jabatan"/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Semester</label>
                                    <select className="form-control" name="status">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <AddButton page="Semester"/>
                    </form>
                </div>
            </div>
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Jabatan"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Jabatan"}/>
            <ModalMultipleActiveSemesterAlert modal={modalSemester} closeModal={closeModalSemester} />
        </>
    )
}