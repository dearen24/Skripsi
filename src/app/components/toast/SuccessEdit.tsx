"use client"
import { CloseButton, Toast, ToastContainer } from "react-bootstrap";

export default function ToastSuccessEdit({toast,closeToast}){
    
    return(
        <ToastContainer position="top-end">
            <Toast show={toast} onClose={closeToast} delay={2000} autohide>
                <Toast.Body>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h5>Perubahan Berhasil Disimpan!</h5>
                        </div>
                        <div>
                            <CloseButton className="btn" onClick={closeToast}></CloseButton>
                        </div>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
)
}