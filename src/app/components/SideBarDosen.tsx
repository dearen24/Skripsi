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
        <div className="d-flex flex-column bg-light container w-7">
            <span className="fs-3 my-1 border border-2 border-dark rounded">Sistem Alokasi Pengawas Ujian</span>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/jadwal" className="nav-link link-light w-100 text-start">
                            Jadwal Mengawas
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuantukar" className="nav-link link-light w-100 text-start">
                            Pengajuan Tukar Jadwal
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuansaya" className="nav-link link-light w-100 text-start">
                            Pengajuan Saya
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                        <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/dosen/pengajuanlain" className="nav-link link-light w-100 text-start">
                            Pengajuan Dosen Lain
                        </Link>
                    </div>
                </Button>
            </li>
            </ul>
            <div className="dropdown">
                    <strong>Halo, {session}</strong>
            </div>
            <div>
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default SidebarDosen;