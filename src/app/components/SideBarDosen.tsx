"use client"
import {signOut} from "next-auth/react"
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";

const SidebarDosen = ({session}) => {
    const handleSignOut = async () => {
        const res = await signOut();
    }

    return(
        <>
        <div className="d-flex flex-column p-2" style={{backgroundColor:"#272829"}}>
            <span className="fs-3 my-1 border border-2 border-light rounded" style={{color:"white", textAlign:"center"}}>Sistem Alokasi Pengawas Ujian</span>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-calendar2-week-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/jadwal" className="nav-link link-light w-100 text-start">
                            <strong>Jadwal Mengawas</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuantukar" className="nav-link link-light w-100 text-start">
                            <strong>Pengajuan Tukar Jadwal</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-person-fill-up.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuansaya" className="nav-link link-light w-100 text-start">
                            <strong>Pengajuan Saya</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-person-fill-down.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuanlain" className="nav-link link-light w-100 text-start">
                            <strong>Pengajuan Dosen Lain</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            </ul>
            <div className="dropdown" style={{color:"white"}}>
                    <strong>Halo, {session}</strong>
            </div>
            <div>
                <button type="button" className="btn btn-block mb-4" style={{backgroundColor:"#61677A", color:"white"}} onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default SidebarDosen;