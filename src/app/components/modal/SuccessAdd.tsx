"use client"
import { Modal } from "react-bootstrap";

export default function ModalSuccessAdd({modal,closeModal,backToHomepage,page}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tetap Disini atau Kembali ke Halaman Utama?</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={backToHomepage}>
                    Kembali ke Halaman Utama
                </button>
                <button className="btn btn-secondary" onClick={closeModal}>
                    Lanjut Tambah {page}
                </button>
            </Modal.Footer>
        </Modal>
)
}