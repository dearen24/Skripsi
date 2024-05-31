"use client"
import { Modal } from "react-bootstrap";

export default function ModalCannotMakePertukaranSameDosen({modal,closeModal }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Membuat Pergantian</Modal.Title>
            </Modal.Header>
            <Modal.Body>Dosen yang akan menggantikan tidak boleh sama!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
    )
}