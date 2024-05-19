"use client"
import { Button, CloseButton, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";

export default function ToastSuccessEdit({toast,closeToast}){
    
    return(
        <ToastContainer position="top-end">
            <Toast show={toast} onClose={closeToast} delay={2000} autohide>
                <Toast.Header closeButton={false} className="justify-content-between">
                    <strong>Berhasil!</strong>
                    <Button style={{backgroundColor:"green"}} className="btn-sm">
                        <Image src="/check-circle-fill.svg" alt="Edit" width={20} height={20} className=""/>
                    </Button>
                </Toast.Header>
                <Toast.Body>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h6>Perubahan Berhasil Disimpan!</h6>
                        </div>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
)
}