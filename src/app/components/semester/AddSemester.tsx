"use client"
import { AddButton } from "@/app/components/buttons/AddButton";
import { addSemester, getActiveSemester } from "@/app/actions/semester";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ToastSuccessAdd from "../toast/SuccessAdd";
import ModalSuccessAdd from "../modal/SuccessAdd";
import ModalMultipleActiveSemesterAlert from "../modal/MultipleActiveSemester";
import { SemesterSchema } from "@/modules/schema";
import ToastErrorInput from "../toast/ErrorInput";

export default function AddSemester(){
    const [modal,setModal] = useState(false);
    const [modalSemester,setModalSemester] = useState(false);
    const [toast,setToast] = useState(false);
    const ref = useRef<HTMLFormElement>(null);
    const [toastError,setToastError] = useState(false);
    const [error,setError] = useState([]);
    const router = useRouter();

    const closeModal = () => setModal(false);
    const openModal = () => setModal(true);
    const closeModalSemester = () => setModalSemester(false);
    const openModalSemester = () => setModalSemester(true);

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);
    const closeToastError = () => setToastError(false);
    const openToastError = () => setToastError(true);


    const backToHomepage = () => router.push("/admin/semester");

    const add = async (formData:FormData) => {
        const activeSemester = await getActiveSemester();
        if(activeSemester!=null&&formData.get("status")?.toString()=="Aktif"){
            openModalSemester();
        }
        else{
            let status = false;
            if(formData.get("status")?.toString()=="Aktif"){
                status = true;
            }

            const data = {
                semester: formData.get("semester"),
                status: status,
            }
    
            const validation = SemesterSchema.safeParse(data);
    
            if(validation.success){
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
            else{
                setError(validation.error.issues);
                openToastError();
            }
        }
    }

    return(
        <>  
            <div className="mx-1">
                <div>
                    <h3><strong>Tambah Semester</strong></h3>
                </div>
                <div>
                    <form ref={ref} action={add}>
                        <div className="d-flex flex-row w-100">
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Nama Semester</label>
                                    <input type="text" name="semester" className="form-control" placeholder="Masukan nama semester" style={{border:"2px solid black"}}/>
                                </div>
                            </div>
                            <div className="w-50">
                                <div className="form-group w-50">
                                    <label>Semester</label>
                                    <select className="form-control" name="status" style={{border:"2px solid black"}}>
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
            
            <ModalSuccessAdd modal={modal} closeModal={closeModal} backToHomepage={backToHomepage} page={"Semester"}/>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Semester"}/>
            <ModalMultipleActiveSemesterAlert modal={modalSemester} closeModal={closeModalSemester} action={"Menambahkan"}/>
            <ToastErrorInput toast={toastError} closeToast={closeToastError} error={error} />
        </>
    )
}