"use client"
import { Modal } from "react-bootstrap";

export default function ModalMultipleActiveSemesterAlert({modal,closeModal }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Menambahkan Semester</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hanya boleh terdapat satu semester dengan status aktif!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}