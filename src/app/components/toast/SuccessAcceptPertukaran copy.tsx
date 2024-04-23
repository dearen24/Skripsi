"use client"
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastSuccessAcceptPertukaran({toast,closeToast}:any){
    
    return(
        <ToastContainer position="top-end">
                <Toast show={toast} onClose={closeToast} delay={2000} autohide>
                    <Toast.Body>
                        <div className="d-flex flex-row">
                            <div>
                                <h5>Berhasil Menyetujui Pertukaran!</h5>
                            </div>
                            <div>
                                <button className="btn" onClick={closeToast}>X</button>
                            </div>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
    )
}