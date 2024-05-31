"use client"

import {signOut} from "next-auth/react"
import Link from "next/link";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useState } from "react";
import { getURL } from "next/dist/shared/lib/utils";

const SidebarAdmin = ({session}) => {
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
            <li className="nav-item my-1" id="/admin/dosen">
                {selectedPage=="/admin/dosen" ?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/dosen" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/dosen">
                            <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/dosen"/>
                            <Link href="/admin/dosen" className="nav-link link-light w-100 text-start" id="/admin/dosen">
                                <strong>Pengguna</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/dosen" onClick={changePage}>
                            <div className="d-flex flex-row align-items-center" id="/admin/dosen">
                            <Image className="text-light" src="/iconizer-people-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/dosen"/>
                            <Link href="/admin/dosen" className="nav-link link-light w-100 text-start" id="/admin/dosen">
                                <strong>Pengguna</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/jabatan">
                {selectedPage=="/admin/jabatan" ?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/jabatan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/jabatan">
                            <Image className="text-light" src="/iconizer-diagram-2-fill.svg" alt="Jabatan" height={25} width={25} id="/admin/jabatan"/>
                            <Link href="/admin/jabatan" className="nav-link link-light w-100 text-start" id="/admin/jabatan">
                                <strong>Jabatan</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/jabatan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/jabatan">
                            <Image className="text-light" src="/iconizer-diagram-2-fill.svg" alt="Jabatan" height={25} width={25} id="/admin/jabatan"/>
                            <Link href="/admin/jabatan" className="nav-link link-light w-100 text-start" id="/admin/jabatan">
                                <strong>Jabatan</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/semester">
                {selectedPage=="/admin/semester" ?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} onClick={changePage} id="/admin/semester">
                        <div className="d-flex flex-row align-items-center" id="/admin/semester">
                            <Image className="text-light" src="/calendar-fill-white.svg" alt="Semester" height={20} width={20} id="/admin/semester"/>
                            <Link href="/admin/semester" className="nav-link link-light w-100 text-start" id="/admin/semester">
                                <strong>Semester</strong>
                            </Link>
                        </div>
                    </Button>
                    :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} onClick={changePage} id="/admin/semester">
                        <div className="d-flex flex-row align-items-center" id="/admin/semester">
                            <Image className="text-light" src="/calendar-fill-white.svg" alt="Semester" height={20} width={20} id="/admin/semester"/>
                            <Link href="/admin/semester" className="nav-link link-light w-100 text-start" id="/admin/semester">
                                <strong>Semester</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/ruangan">
                {selectedPage=="/admin/ruangan"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/ruangan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/ruangan">
                            <Image className="text-light" src="/door-closed-fill-white.svg" alt="Pengguna" height={20} width={20} id="/admin/ruangan"/>
                            <Link href="/admin/ruangan" className="nav-link link-light w-100 text-start" id="/admin/ruangan">
                                <strong>Ruangan</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/ruangan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/ruangan">
                            <Image className="text-light" src="/door-closed-fill-white.svg" alt="Pengguna" height={20} width={20} id="/admin/ruangan"/>
                            <Link href="/admin/ruangan" className="nav-link link-light w-100 text-start" id="/admin/ruangan">
                                <strong>Ruangan</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/matkul">
                {selectedPage=="/admin/matkul"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/matkul" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/matkul">
                            <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20} id="/admin/matkul"/>
                            <Link href="/admin/matkul" className="nav-link link-light w-100 text-start" id="/admin/matkul">
                            <strong>Mata Kuliah</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/matkul" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/matkul">
                            <Image className="text-light" src="/book-fill-white.svg" alt="Pengguna" height={20} width={20} id="/admin/matkul"/>
                            <Link href="/admin/matkul" className="nav-link link-light w-100 text-start" id="/admin/matkul">
                            <strong>Mata Kuliah</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/matkulujian">
                {selectedPage=="/admin/matkulujian"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/matkulujian" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/matkulujian">
                            <Image className="text-light" src="/iconizer-card-list.svg" alt="Pengguna" height={20} width={20} id="/admin/matkulujian"/>
                            <Link href="/admin/matkulujian" className="nav-link link-light w-100 text-start" id="/admin/matkulujian">
                            <strong>Mata Kuliah Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/matkulujian" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/matkulujian">
                            <Image className="text-light" src="/iconizer-card-list.svg" alt="Pengguna" height={20} width={20} id="/admin/matkulujian"/>
                            <Link href="/admin/matkulujian" className="nav-link link-light w-100 text-start" id="/admin/matkulujian">
                            <strong>Mata Kuliah Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/ujian">
                {selectedPage=="/admin/ujian"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/ujian" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/ujian">
                            <Image className="text-light" src="/iconizer-pen-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/ujian"/>
                            <Link href="/admin/ujian" className="nav-link link-light w-100 text-start" id="/admin/ujian">
                                <strong>Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/ujian" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/ujian">
                            <Image className="text-light" src="/iconizer-pen-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/ujian"/>
                            <Link href="/admin/ujian" className="nav-link link-light w-100 text-start" id="/admin/ujian">
                                <strong>Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/aturruangan">
                {selectedPage=="/admin/aturruangan"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/aturruangan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturruangan">
                            <Image className="text-light" src="/iconizer-door-open-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturruangan"/>
                            <Link href="/admin/aturruangan" className="nav-link link-light w-100 text-start" id="/admin/aturruangan">
                            <strong>Atur Ruangan Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/aturruangan" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturruangan">
                            <Image className="text-light" src="/iconizer-door-open-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturruangan"/>
                            <Link href="/admin/aturruangan" className="nav-link link-light w-100 text-start" id="/admin/aturruangan">
                            <strong>Atur Ruangan Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/aturpengawas">
                {selectedPage=="/admin/aturpengawas"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/aturpengawas" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturpengawas">
                            <Image className="text-light" src="/iconizer-person-lines-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturpengawas"/>
                            <Link href="/admin/aturpengawas" className="nav-link link-light w-100 text-start" id="/admin/aturpengawas">
                            <strong>Atur Pengawas Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/aturpengawas" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturpengawas">
                            <Image className="text-light" src="/iconizer-person-lines-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturpengawas"/>
                            <Link href="/admin/aturpengawas" className="nav-link link-light w-100 text-start" id="/admin/aturpengawas">
                            <strong>Atur Pengawas Ujian</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/konsumsi">
                {selectedPage=="/admin/konsumsi"?
                <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/konsumsi" onClick={changePage}>
                    <div className="d-flex flex-row align-items-center" id="/admin/konsumsi">
                        <Image className="text-light" src="/iconizer-egg-fried.svg" alt="Pengguna" height={20} width={20} id="/admin/konsumsi"/>
                        <Link href="/admin/konsumsi" className="nav-link link-light w-100 text-start" id="/admin/konsumsi">
                        <strong>Konsumsi</strong>
                        </Link>
                    </div>
                </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/konsumsi" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/konsumsi">
                            <Image className="text-light" src="/iconizer-egg-fried.svg" alt="Pengguna" height={20} width={20} id="/admin/konsumsi"/>
                            <Link href="/admin/konsumsi" className="nav-link link-light w-100 text-start" id="/admin/konsumsi">
                            <strong>Konsumsi</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/aturankonsumsi">
                {selectedPage=="/admin/aturankonsumsi"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/aturankonsumsi" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturankonsumsi">
                            <Image className="text-light" src="/iconizer-exclamation-circle-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturankonsumsi"/>
                            <Link href="/admin/aturankonsumsi" className="nav-link link-light w-100 text-start" id="/admin/aturankonsumsi">
                            <strong>Aturan Konsumsi</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/aturankonsumsi" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/aturankonsumsi">
                            <Image className="text-light" src="/iconizer-exclamation-circle-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/aturankonsumsi"/>
                            <Link href="/admin/aturankonsumsi" className="nav-link link-light w-100 text-start" id="/admin/aturankonsumsi">
                            <strong>Aturan Konsumsi</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/pertukarandosen">
                {selectedPage=="/admin/pertukarandosen"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/pertukarandosen" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/pertukarandosen">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/admin/pertukarandosen"/>
                            <Link href="/admin/pertukarandosen" className="nav-link link-light w-100 text-start" id="/admin/pertukarandosen">
                            <strong>Pertukaran Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/pertukarandosen" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/pertukarandosen">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/admin/pertukarandosen"/>
                            <Link href="/admin/pertukarandosen" className="nav-link link-light w-100 text-start" id="/admin/pertukarandosen">
                            <strong>Pertukaran Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/pergantiandosen">
                {selectedPage=="/admin/pergantiandosen"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/pergantiandosen" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/pergantiandosen">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/admin/pergantiandosen"/>
                            <Link href="/admin/pergantiandosen" className="nav-link link-light w-100 text-start" id="/admin/pergantiandosen">
                            <strong>Pergantian Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/pergantiandosen" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/pergantiandosen">
                            <Image className="text-light" src="/iconizer-arrow-left-right.svg" alt="Pengguna" height={20} width={20} id="/admin/pergantiandosen"/>
                            <Link href="/admin/pergantiandosen" className="nav-link link-light w-100 text-start" id="/admin/pergantiandosen">
                            <strong>Pergantian Jadwal</strong>
                            </Link>
                        </div>
                    </Button>
                }
            </li>
            <li className="nav-item my-1" id="/admin/rekapmengawas">
                {selectedPage=="/admin/rekapmengawas"?
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#AF8260"}} id="/admin/rekapmengawas" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/rekapmengawas">
                            <Image className="text-light" src="/clipboard2-data-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/rekapmengawas"/>
                            <Link href="/admin/rekapmengawas" className="nav-link link-light w-100 text-start" id="/admin/rekapmengawas">
                            <strong>Rekap Mengawas</strong>
                            </Link>
                        </div>
                    </Button>
                :
                    <Button className="w-100 btn btn-dark" style={{backgroundColor:"#61677A"}} id="/admin/rekapmengawas" onClick={changePage}>
                        <div className="d-flex flex-row align-items-center" id="/admin/rekapmengawas">
                            <Image className="text-light" src="/clipboard2-data-fill.svg" alt="Pengguna" height={20} width={20} id="/admin/rekapmengawas"/>
                            <Link href="/admin/rekapmengawas" className="nav-link link-light w-100 text-start" id="/admin/rekapmengawas">
                            <strong>Rekap Mengawas</strong>
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

export default SidebarAdmin;