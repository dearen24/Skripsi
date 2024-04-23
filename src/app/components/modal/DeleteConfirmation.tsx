"use client"
import { Modal } from "react-bootstrap";

export default function DeleteConfirmationModal({modal,closeModal,deleteData,page}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah Anda yakin ingin menghapus {page}?</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={closeModal}>
                    Batal
                </button>
                <button className="btn btn-danger" onClick={deleteData}>
                    Hapus
                </button>
            </Modal.Footer>
        </Modal>
)
}