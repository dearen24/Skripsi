"use client"
import Image from "next/image"

export function RejectButton(props){
    return(
        <>
            <button type="submit" className="btn btn-outline-danger w-50 my-2 mx-1" onClick={props.onClick}>
                <Image  src="/x-circle-fill.svg" alt="Edit" width={20} height={20} className="mx-2"/>
            </button>
        </>
    )
}