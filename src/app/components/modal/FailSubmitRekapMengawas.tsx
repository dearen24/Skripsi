"use client"
import { Modal } from "react-bootstrap";

export default function ModalFailSubmitRekapMengawas({modal,closeModal}:any){
    return(
            <Modal show={modal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>Rekap Mengawas Sudah Ada</Modal.Title>
                </Modal.Header>
                <Modal.Body>Rekap Mengawas untuk semester tersebut sudah dikumpulkan!</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                        Tutup
                    </button>
                </Modal.Footer>
            </Modal>
    )
}