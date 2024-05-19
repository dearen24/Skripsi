"use client"
import { Modal } from "react-bootstrap";

export default function MakePertukaranAdminModal({modal,closeModal,onActionWithKonsumsi,onActionWithoutKonsumsi}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Apakah konsumsi juga ingin ditukar?</Modal.Body>
            <Modal.Body>Jika konsumsi tidak ditukar terdapat kemungkinan dosen tidak mendapatkan konsumsi!</Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tidak
                </button>
                <button className="btn btn-secondary" onClick={onActionWithoutKonsumsi} style={{border:"2px solid black"}}>
                    Jangan Tukar Konsumsi
                </button>
                <button className="btn btn-secondary" onClick={onActionWithKonsumsi} style={{border:"2px solid black"}}>
                    Tukar Konsumsi
                </button>
            </Modal.Footer>
        </Modal>
    )
}