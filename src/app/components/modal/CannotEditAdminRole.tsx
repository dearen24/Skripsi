"use client"
import { Modal } from "react-bootstrap";

export default function ModalCannotEditAdminRole({modal,closeModal }:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Mengubah Pengguna</Modal.Title>
            </Modal.Header>
            <Modal.Body>Pengguna dengan Jabatan Admin tidak boleh diubah!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}