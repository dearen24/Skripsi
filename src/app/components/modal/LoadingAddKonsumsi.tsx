"use client"
import { Modal, ModalBody, Spinner } from "react-bootstrap";

export default function ModalLoadingAddKonsumsi({modal,closeModal,}:any){
    return(
        <Modal show={modal} backdrop="static">
            <ModalBody>
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <span className="px-3">Sedang Menghitung Konsumsi</span>
                    <Spinner/>
                </div>
            </ModalBody>
        </Modal>
    )
}