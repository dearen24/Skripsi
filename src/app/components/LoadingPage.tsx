"use client"

import { Spinner } from "react-bootstrap";

const LoadingPage = (props: Props) => {
    return(
        <>
                <div className="d-flex h-100 justify-content-center align-items-center">
                    <div>
                        <Spinner animation="grow" className="mx-1" style={{color:"#272829"}}/>
                        <Spinner animation="grow" className="mx-1" style={{color:"#272829"}}/>
                        <Spinner animation="grow" className="mx-1" style={{color:"#272829"}}/>
                    </div>
                </div>
            </>
    )
}

export default LoadingPage;