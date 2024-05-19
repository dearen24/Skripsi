"use client"
import { Button, CloseButton, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";

export default function ToastErrorInput({toast,closeToast,error}){
    
    return(
        <ToastContainer position="top-end">
            <Toast show={toast} onClose={closeToast} delay={2000} autohide>
                <Toast.Header closeButton={false} className="justify-content-between">
                    <strong>Gagal!</strong>
                    <Button style={{backgroundColor:"#dc143c"}} className="btn-sm btn-danger">
                        <Image src="/x-circle-fill.svg" alt="Edit" width={20} height={20} className=""/>
                    </Button>
                </Toast.Header>
                <Toast.Body>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            {error.map((e)=>(
                                <h6>{e.message}</h6>
                            ))}
                        </div>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
)
}