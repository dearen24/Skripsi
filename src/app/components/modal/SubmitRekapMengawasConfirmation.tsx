"use client"
import { Modal } from "react-bootstrap";

export default function SubmitRekapMengawasConfirmationModal({modal,closeModal,onAction,semester,masaujian}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah Anda yakin ingin memasukan rekap mengawas untuk semester {semester} dan masa ujian {masaujian}?</Modal.Body>
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