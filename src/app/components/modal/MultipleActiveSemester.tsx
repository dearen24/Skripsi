"use client"
import { Modal } from "react-bootstrap";

export default function ModalMultipleActiveSemesterAlert({modal,closeModal,action }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Gagal {action} Semester</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hanya boleh terdapat satu semester dengan status aktif!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
    )
}