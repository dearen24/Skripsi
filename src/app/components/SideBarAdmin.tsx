"use client"

import {signOut} from "next-auth/react"
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";

const SidebarAdmin = ({session}) => {
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
                        <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/dosen" className="nav-link link-light w-100 text-start">
                            <strong>Pengguna</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-diagram-2-fill.svg" alt="Pengguna" height={25} width={25}/>
                        <Link href="/admin/jabatan" className="nav-link link-light w-100 text-start">
                            <strong>Jabatan</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/calendar-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/semester" className="nav-link link-light w-100 text-start">
                            <strong>Semester</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/door-closed-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/ruangan" className="nav-link link-light w-100 text-start">
                        <strong>Ruangan</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/matkul" className="nav-link link-light w-100 text-start">
                        <strong>Mata Kuliah</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-card-list.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/matkulujian" className="nav-link link-light w-100 text-start">
                        <strong>Mata Kuliah Ujian</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-pen-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/ujian" className="nav-link link-light w-100 text-start">
                        <strong>Ujian</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-door-open-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturruangan" className="nav-link link-light w-100 text-start">
                        <strong>Atur Ruangan Ujian</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-person-lines-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturpengawas" className="nav-link link-light w-100 text-start">
                        <strong>Atur Pengawas Ujian</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-egg-fried.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/konsumsi" className="nav-link link-light w-100 text-start">
                        <strong>Konsumsi</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-exclamation-circle-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturankonsumsi" className="nav-link link-light w-100 text-start">
                        <strong>Aturan Konsumsi</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/pertukarandosen" className="nav-link link-light w-100 text-start">
                        <strong>Pertukaran Jadwal</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}}>
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/clipboard2-data-fill.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/rekapmengawas" className="nav-link link-light w-100 text-start">
                        <strong>Rekap Mengawas</strong>
                        </Link>
                    </div>
                </Button>
            </li>
            </ul>
            <div className="dropdown" style={{color:"white"}}>
                    <strong>Halo, {session}</strong>
            </div>
            <div>
                <button type="button" className="btn" style={{backgroundColor:"#61677A", color:"white"}} onClick={handleSignOut}>Sign Out</button>
            </div>
        </div>
        </>
    )
}

export default SidebarAdmin;