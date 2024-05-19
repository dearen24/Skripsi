"use client"
import Image from "next/image"

export function AddButton(page){
    return(
        <>
            {/* {disabled ? 
                <button type="submit" className="btn w-100 my-2" style={{backgroundColor:"#272829", color:"white", cursor:"not-allowed", pointerEvents:"all"}} disabled>
                    <Image  src="/iconizer-plus-circle-fill.svg" alt="Edit" width={20} height={20} className="mx-2 mb-1"/>
                    Tambah {page.page}
                </button>
            : */}
                <button type="submit" className="btn w-100 my-2" style={{backgroundColor:"#272829",color:"white"}}>
                    <Image  src="/iconizer-plus-circle-fill.svg" alt="Edit" width={20} height={20} className="mx-2 mb-1"/>
                    Tambah {page.page}
                </button>
            {/* } */}
        </>
    )
}