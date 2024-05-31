"use client"
import { Modal } from "react-bootstrap";

export default function ModalFailTukarPendingSaya({modal,closeModal}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Gagal Mengajukan Pertukaran Jadwal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Terdapat jadwal mengawas Anda yang sedang dalam status <strong>Belum Disetujui</strong>!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}