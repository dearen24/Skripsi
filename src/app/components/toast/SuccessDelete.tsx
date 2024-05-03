"use client"
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";

export default function ToastSuccessDelete({toastTambah,closeToastTambah,page}:any){
    
    return(
        <ToastContainer position="top-end">
            <Toast show={toastTambah} onClose={closeToastTambah} delay={2000} autohide>
                <Toast.Body>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h5>{page} Berhasil Dihapus!</h5>
                        </div>
                        <div>
                            <CloseButton className="btn" onClick={closeToastTambah}></CloseButton>
                        </div>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}