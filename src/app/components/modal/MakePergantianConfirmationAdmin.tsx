"use client"
import { Modal } from "react-bootstrap";

export default function MakePergantianAdminModal({modal,closeModal,onAction}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah anda yakin untuk membuat pergantian ini?</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tidak
                </button>
                <button className="btn btn-success" onClick={onAction} style={{border:"2px solid black"}}>
                    Ya
                </button>
            </Modal.Footer>
        </Modal>
    )
}