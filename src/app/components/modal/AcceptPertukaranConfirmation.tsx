"use client"
import { Modal } from "react-bootstrap";

export default function AcceptPertukaranModal({modal,closeModal,onAction}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Jika sudah menyetujui pertukaran ini maka status sudah tidak dapat diubah lagi.</Modal.Body>
            <Modal.Body>Apakah Anda yakin ingin menyetujui pertukaran ini ?</Modal.Body>
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