"use client"
import { makeUjianByExcel } from "@/app/actions/ujian";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as XLSX from 'xlsx';
import ModalSuccessAdd from "./SuccessAdd";
import ToastSuccessAdd from "../toast/SuccessAdd";

export default function ImportUjianExcelModal({modal,closeModal}:any){
    const [excelFile, setExcelFile] = useState(null);
    const [toast, setToast] = useState(false);    

    const closeToast = () => setToast(false);
    const openToast = () => setToast(true);

    const submitExcel = (e) => {
        let reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload=(e)=>{
            setExcelFile(e.target.result);
        }
    }

    const readExcel = async (e) => {
        e.preventDefault();
        closeModal();
        if(excelFile!=null){
            const workbook = XLSX.read(excelFile,{type:"buffer"});
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            let arrData = [];
            let day = "";
            let indexTanggal = -1;
            for(let i = 0;i<data.length;i++){
                if(data[i].__EMPTY.includes("Senin")||data[i].__EMPTY.includes("Selasa")||data[i].__EMPTY.includes("Rabu")||data[i].__EMPTY.includes("Kamis")||data[i].__EMPTY.includes("Jumat")||data[i].__EMPTY.includes("Sabtu")){
                    day = data[i].__EMPTY;
                    arrData.push([]);
                }
                else{
                    if(data[i].__EMPTY!="KODE MK"&&day!=""){
                        const item = new Object;
                        item.tanggal = day; 
                        item.ruangan = [];
                        item.peserta = data[i].__EMPTY_4; 
                        item.kode = data[i].__EMPTY;
                        item.matkul = data[i].__EMPTY_1;
                        item.waktu = data[i].__EMPTY_3;
                        if(Number.isInteger(data[i].__EMPTY_6)){
                            item.ruangan.push("9014");
                        }
                        if(Number.isInteger(data[i].__EMPTY_7)){
                            item.ruangan.push("9120");
                        }
                        if(Number.isInteger(data[i].__EMPTY_8)){
                            item.ruangan.push("9121");
                        }
                        if(Number.isInteger(data[i].__EMPTY_9)){
                            item.ruangan.push("9122");
                        }
                        if(Number.isInteger(data[i].__EMPTY_10)){
                            item.ruangan.push("10316");
                        }
                        if(Number.isInteger(data[i].__EMPTY_11)){
                            item.ruangan.push("10317");
                        }
                        if(Number.isInteger(data[i].__EMPTY_12)){
                            item.ruangan.push("10323");
                        }
                        if(Number.isInteger(data[i].__EMPTY_13)){
                            item.ruangan.push("2060101");
                        }
                        if(Number.isInteger(data[i].__EMPTY_14)){
                            item.ruangan.push("2060102");
                        }
                        if(Number.isInteger(data[i].__EMPTY_15)){
                            item.ruangan.push("2060103");
                        }
                        if(Number.isInteger(data[i].__EMPTY_16)){
                            item.ruangan.push("2060104");
                        }
                        if(Number.isInteger(data[i].__EMPTY_17)){
                            item.ruangan.push("2060105");
                        }
                        if(Number.isInteger(data[i].__EMPTY_18)){
                            item.ruangan.push("2060107");
                        }
                        if(Number.isInteger(data[i].__EMPTY_19)){
                            item.ruangan.push("2060109");
                        }
                        if(Number.isInteger(data[i].__EMPTY_20)){
                            item.ruangan.push("2060110");
                        }
                        if(Number.isInteger(data[i].__EMPTY_21)){
                            item.ruangan.push("9016");
                        }
                        if(Number.isInteger(data[i].__EMPTY_22)){
                            item.ruangan.push("9017");
                        }
                        if(Number.isInteger(data[i].__EMPTY_23)){
                            item.ruangan.push("9018");
                        }
                        arrData[indexTanggal].push(item);
                    }
                    else if(data[i].__EMPTY=="KODE MK"){
                        indexTanggal++;
                    }
                }
            }
            
            const semester = "deba130f-75bf-40fe-896a-fd93b853b54d";
            const masaujian = "Pendek";
            const response = await makeUjianByExcel(semester,masaujian,arrData);
            if(!response){
                alert("Gagal");
            }
            else{
                openToast();
            }
        }
    }

    return(
        <>
            <Modal show={modal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Masukan File Excel</Form.Label>
                    <Form.Control type="file" onChange={submitExcel}/>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={closeModal} style={{border:"2px solid black"}}>
                        Batal
                    </button>
                    <button className="btn btn-success" onClick={readExcel} style={{border:"2px solid black"}}>
                        Import Data
                    </button>
                </Modal.Footer>
            </Modal>
            <ToastSuccessAdd toast={toast} closeToast={closeToast} page={"Ujian"}/>
        </>
    )
}