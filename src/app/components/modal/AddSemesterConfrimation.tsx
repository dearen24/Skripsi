"use client"
import { Modal } from "react-bootstrap";

export default function AddSemesterConfirmationModal({modal,closeModal,onAction,semester}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Semester yang akan ditambahkan adalah semester berikutnya dihitung dari semester yang sedang aktif sekarang!</Modal.Body>
            <Modal.Body>Semester yang akan ditambahkan adalah semester <strong>{semester}</strong></Modal.Body>
            <Modal.Body>Apakah Anda yakin untuk menambahkan semester?</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tidak
                </button>
                <button className="btn btn-success" onClick={onAction} style={{border:"2px solid black"}}>
                    Tambah Semester
                </button>
            </Modal.Footer>
        </Modal>
    )
}