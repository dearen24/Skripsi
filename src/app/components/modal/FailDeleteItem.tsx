"use client"
import { Modal } from "react-bootstrap";

export default function ModalFailDeleteItem({modal,closeModal,page}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header>
                <Modal.Title>Gagal Menghapus {page}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{page} yang akan dihapus memiliki hubungan pada data yang lain!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}