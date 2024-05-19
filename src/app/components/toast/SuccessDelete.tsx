"use client"
import { Button, Card, CardBody, CloseButton, Toast, ToastContainer, ToastHeader } from "react-bootstrap";
import Image from "next/image";

export default function ToastSuccessDelete({toastTambah,closeToastTambah,page}:any){
    
    return(
        <ToastContainer position="top-end">
            <Toast show={toastTambah} onClose={closeToastTambah} delay={2000} autohide>
                <Toast.Header closeButton={false} className="justify-content-between">
                    <strong>Berhasil!</strong>
                    <Button style={{backgroundColor:"green"}} className="btn-sm">
                        <Image src="/check-circle-fill.svg" alt="Edit" width={20} height={20} className=""/>
                    </Button>
                </Toast.Header>
                <Toast.Body style={{backgroundColor:""}}>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <h6>{page} Berhasil Dihapus!</h6>
                        </div>
                    </div>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}