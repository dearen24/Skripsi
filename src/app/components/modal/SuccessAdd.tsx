"use client"
import { Modal } from "react-bootstrap";

export default function ModalSuccessAdd({modal,closeModal,backToHomepage,page}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tetap disini atau kembali ke halaman utama?</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={backToHomepage} style={{border:"2px solid black"}}>
                    Kembali ke Halaman Utama
                </button>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Lanjut Tambah {page}
                </button>
            </Modal.Footer>
        </Modal>
)
}