"use client"
import Image from "next/image"
import { useState } from "react";

export function AcceptButton(props){

    return(
        <>
            <button type="submit" className="btn btn-success w-50 my-2 mx-1" style={{border:"2px solid black"}} onClick={props.onClick}>
                <strong>Setuju</strong>
            </button>
        </>
    )
}