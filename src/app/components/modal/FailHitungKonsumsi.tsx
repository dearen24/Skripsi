"use client"
import { Modal } from "react-bootstrap";

export default function ModalFailHitungKonsumsi({modal,closeModal,dataKonsumsi }:any){
    return(
            <Modal show={modal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Gagal Menghitung Konsumsi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Terdapat kasus dimana aturan konsumsi tidak ada yang sesuai dengan jadwal mengawas dosen!</Modal.Body>
                <Modal.Body>
                    <div>8-10: {dataKonsumsi.delapanSepuluh.toString()}</div>
                    <div>10-12: {dataKonsumsi.sepuluhDuaBelas.toString()}</div>
                    <div>11-13: {dataKonsumsi.sebelasTigaBelas.toString()}</div>
                    <div>12-14: {dataKonsumsi.duaBelasDua.toString()}</div>
                    <div>14-16: {dataKonsumsi.duaEmpat.toString()}</div>
                </Modal.Body>
                <Modal.Body>Silahkan tambahkan aturan baru terlebih dahulu lalu hitung konsumsi kembali!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                        Tutup
                    </button>
                </Modal.Footer>
            </Modal>
    )
}