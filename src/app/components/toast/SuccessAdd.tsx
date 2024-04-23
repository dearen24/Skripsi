"use client"
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastSuccessAdd({toast,closeToast,page}:any){
    
    return(
        <ToastContainer position="top-end">
                <Toast show={toast} onClose={closeToast} delay={2000} autohide>
                    <Toast.Body>
                        <div className="d-flex flex-row">
                            <div>
                                <h5>Berhasil Menambahkan {page}!</h5>
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