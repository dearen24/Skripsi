"use client"
import Image from "next/image"

export function RejectButton(props){
    return(
        <>
            <button type="submit" className="btn btn-danger w-50 my-2 mx-1" style={{border:"2px solid black"}} onClick={props.onClick}>
                <strong>Tolak</strong>
            </button>
        </>
    )
}