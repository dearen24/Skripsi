"use client"
import { Modal } from "react-bootstrap";

export default function ModalGantiJadwalColission({modal,closeModal}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Mmebuat Pergantian Dosen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Jadwal dosen yang akan menggantikan bentrok dengan jadwal yang akan digantikan!</div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}