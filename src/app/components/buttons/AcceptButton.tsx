"use client"
import Image from "next/image"
import { useState } from "react";

export function AcceptButton(props){

    return(
        <>
            <button type="submit" className="btn btn-outline-success w-50 my-2 mx-1" onClick={props.onClick}>
                <Image  src="/check-circle-fill.svg" alt="Edit" width={20} height={20} className="mx-2"/>
            </button>
        </>
    )
}