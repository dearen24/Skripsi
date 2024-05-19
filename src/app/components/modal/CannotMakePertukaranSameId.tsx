"use client"
import { Modal } from "react-bootstrap";

export default function ModalCannotMakePertukaranSameId({modal,closeModal }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Mengajukan Pertukaran</Modal.Title>
            </Modal.Header>
            <Modal.Body>Jadwal yang ditukar tidak boleh sama!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}