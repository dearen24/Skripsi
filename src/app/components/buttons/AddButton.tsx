"use client"
import Image from "next/image"

export function AddButton(page){
    return(
        <>
            <button type="submit" className="btn btn-primary w-100 my-2">
                <Image  src="/person-plus-fill-white.svg" alt="Edit" width={20} height={20} className="mx-2"/>
                Tambah {page.page}
            </button>
        </>
    )
}