"use client"

import {signOut, useSession} from "next-auth/react"
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Image from "next/image";

const SidebarAdmin = ({session}) => {
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
                        <Link href="/admin/dosen" className="nav-link link-light w-100 text-start">
                            Pengguna
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/iconizer-diagram-2-fill.svg" alt="Pengguna" height={25} width={25}/>
                        <Link href="/admin/jabatan" className="nav-link link-light w-100 text-start">
                            Jabatan
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/calendar-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/semester" className="nav-link link-light w-100 text-start">
                            Semester
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/door-closed-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/ruangan" className="nav-link link-light w-100 text-start">
                            Ruangan
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/matkul" className="nav-link link-light w-100 text-start">
                            Mata Kuliah
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/matkulujian" className="nav-link link-light w-100 text-start">
                            Mata Kuliah Ujian
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/ujian" className="nav-link link-light w-100 text-start">
                            Ujian
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturruangan" className="nav-link link-light w-100 text-start">
                            Atur Ruangan Ujian
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturpengawas" className="nav-link link-light w-100 text-start">
                            Atur Pengawas Ujian
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/konsumsi" className="nav-link link-light w-100 text-start">
                            Konsumsi
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/aturankonsumsi" className="nav-link link-light w-100 text-start">
                            Aturan Konsumsi
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/pertukarandosen" className="nav-link link-light w-100 text-start">
                            Pertukaran Jadwal Mengawas
                        </Link>
                    </div>
                </Button>
            </li>
            <li className="nav-item my-1">
                <Button className="w-100 btn btn-dark">
                    <div className="d-flex flex-row align-items-center">
                        <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20}/>
                        <Link href="/admin/rekapmengawas" className="nav-link link-light w-100 text-start">
                            Rekap Mengawas
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

export default SidebarAdmin;