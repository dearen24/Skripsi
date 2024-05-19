"use client"
import { Modal, ModalBody } from "react-bootstrap";

export default function ModalSuccessCountKonsumsi({modal,closeModal,semester,masaujian}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Berhasil Menghitung Konsumsi</Modal.Title>
            </Modal.Header>
            <ModalBody>Berhasil Menghitung Konsumsi untuk semester {semester} dan masa ujian {masaujian}!</ModalBody>
            <Modal.Body>Anda dapat melakukan pengecekan jumlah konsumsi pada tab Cek Konsumsi!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
    )
}