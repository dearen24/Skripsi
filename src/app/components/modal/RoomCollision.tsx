"use client"
import { Modal } from "react-bootstrap";

export default function ModalRoomColission({modal,closeModal,rooms}:any){
    return(
        <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Gagal Mengautur Ruangan Ujian</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>Terdapat ruangan yang bentrok</div>
                <div>
                    {rooms.map((room)=>(
                        <h6>{room}</h6>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={closeModal} style={{border:"2px solid black"}}>
                    Tutup
                </button>
            </Modal.Footer>
        </Modal>
)
}