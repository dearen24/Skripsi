"use client"
import { Button, Toast, ToastContainer } from "react-bootstrap";
import Image from "next/image";

export default function ToastSuccessMakePertukaranAdmin({toast,closeToast}:any){
    
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
                        <div className="d-flex flex-row">
                            <div>
                                <h6>Berhasil Membuat Pertukaran!</h6>
                            </div>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
    )
}