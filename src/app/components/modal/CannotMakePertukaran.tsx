"use client"
import { Modal } from "react-bootstrap";

export default function ModalCannotMakePertukaran({modal,closeModal }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Mengajukan Pertukaran</Modal.Title>
            </Modal.Header>
            <Modal.Body>Jadwal Anda dan jadwal dosen lain tidak boleh kosong!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}