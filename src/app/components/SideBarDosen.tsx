"use client"
import {signOut} from "next-auth/react"
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { getURL } from "next/dist/shared/lib/utils";
import { useState } from "react";

const SidebarDosen = ({session}) => {
    const [selectedPage, setSelectedPage] = useState(getURL());

    const changePage = async (e) => {
        setSelectedPage(e.target.parentElement.id);
    }

    const handleSignOut = async () => {
        const res = await signOut();
    }

    return(
        <>
        <div className="d-flex flex-column p-2" style={{backgroundColor:"#272829"}}>
            <span className="fs-3 my-1 border border-2 border-light rounded" style={{color:"white", textAlign:"center"}}>Sistem Alokasi Pengawas Ujian</span>
            <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item my-1" id="/dosen/jadwal">
                {selectedPage=="/dosen/jadwal" ? 
                    <Button className="w-100 btn btn-dark" id="/dosen/jadwal" style={{backgroundColor:"#AF8260"}} onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/dosen/jadwal">
                            <Image className="text-light" src="/iconizer-calendar2-week-fill.svg" alt="Pengguna" height={20} width={20} id="/dosen/jadwal"/>
                            <Link href="/dosen/jadwal" className="nav-link link-light w-100 text-start" id="/dosen/jadwal">
                                <strong>Jadwal Mengawas</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" id="/dosen/jadwal" style={{backgroundColor:"#61677A"}} onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/dosen/jadwal">
                            <Image className="text-light" src="/iconizer-calendar2-week-fill.svg" alt="Pengguna" height={20} width={20} id="/dosen/jadwal"/>
                            <Link href="/dosen/jadwal" className="nav-link link-light w-100 text-start" id="/dosen/jadwal">
                                <strong>Jadwal Mengawas</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/dosen/pengajuantukar">
                {selectedPage=="/dosen/pengajuantukar" ?
                     <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/dosen/pengajuantukar" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/dosen/pengajuantukar">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuantukar"/>
                            <Link href="/dosen/pengajuantukar" className="nav-link link-light w-100 text-start" id="/dosen/pengajuantukar">
                                <strong>Pengajuan Tukar Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/dosen/pengajuantukar" onClick={changePage}>
                            <div className="d-flex flex-row align-items-center" id="/dosen/pengajuantukar">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuantukar"/>
                            <Link href="/dosen/pengajuantukar" className="nav-link link-light w-100 text-start" id="/dosen/pengajuantukar">
                                <strong>Pengajuan Tukar Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/dosen/pengajuansaya">
                {selectedPage=="/dosen/pengajuansaya" ?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/dosen/pengajuansaya" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/dosen/pengajuansaya">
                            <Image className="text-light" src="/iconizer-person-fill-up.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuansaya"/>
                            <Link href="/dosen/pengajuansaya" className="nav-link link-light w-100 text-start" id="/dosen/pengajuansaya">
                                <strong>Pengajuan Saya</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/dosen/pengajuansaya" onClick={changePage}>
                            <div className="d-flex flex-row align-items-center" id="/dosen/pengajuansaya">
                            <Image className="text-light" src="/iconizer-person-fill-up.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuansaya"/>
                            <Link href="/dosen/pengajuansaya" className="nav-link link-light w-100 text-start" id="/dosen/pengajuansaya">
                                <strong>Pengajuan Saya</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/dosen/pengajuanlain">
                {selectedPage=="/dosen/pengajuanlain" ? 
                        <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} onClick={changePage} id="/dosen/pengajuanlain">
                            <div className="d-flex flex-row align-items-center" id="/dosen/pengajuanlain">
                                <Image className="text-light" src="/iconizer-person-fill-down.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuanlain"/>
                                <Link href="/dosen/pengajuanlain" className="nav-link link-light w-100 text-start" id="/dosen/pengajuanlain">
                                    <strong>Pengajuan Dosen Lain</strong>
                                </Link>
                            </div>
                        </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} onClick={changePage} id="/dosen/pengajuanlain">
                            <div className="d-flex flex-row align-items-center" id="/dosen/pengajuanlain">
                            <Image className="text-light" src="/iconizer-person-fill-down.svg" alt="Pengguna" height={20} width={20} id="/dosen/pengajuanlain"/>
                            <Link href="/dosen/pengajuanlain" className="nav-link link-light w-100 text-start" id="/dosen/pengajuanlain">
                                <strong>Pengajuan Dosen Lain</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            </ul>
            <div className="dropdown" style={{color:"white"}}>
                    <strong>Halo, {session}</strong>
            </div>
            <div>
                <button type="button" className="btn" style={{backgroundColor:"#61677A", color:"white"}} onClick={handleSignOut}>
                    <Image src="/iconizer-box-arrow-left.svg" alt="Pengguna" height={20} width={20} style={{marginRight:"10px"}}/>
                    <strong>Keluar</strong>
                </button>
            </div>
        </div>
        </>
    )
}

export default SidebarDosen;