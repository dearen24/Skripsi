"use client"
import Image from "next/image";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge } from "react-bootstrap";

const ItemPengajuanSaya = (props) => {
    
    return(
        <>
            <tbody>
                <tr>
                    <td className="text-center">
                        <div className="d-flex flex-row align-items-center">
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>Tanggal</span>
                                <span>Waktu Mulai</span>
                                <span>Waktu Selesai</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>: {props.item.Dosen1.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen1.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen1.ujian.date.toDateString().split(" ")[3]}</span>
                                <span>: {props.item.Dosen1.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</span>
                                <span>: {props.item.Dosen1.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>Mata Kuliah</span>
                                <span>Ruangan</span>
                                <span>Dosen</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column w-100 justify-content-center">
                                        {props.item.Dosen1.ujian.matkul.map((item)=>(
                                            <span>: {item.nama}</span>
                                        ))}
                                    </div>
                                </div>
                                <span>: {props.item.Dosen1.ruangan.nama}</span>
                                <span>: {props.item.Dosen1.dosen.nama}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        <Image src="/arrow-right-circle-fill.svg" alt="Edit" width={25} height={25}/>
                    </td>
                    <td className="text-center">
                    <div className="d-flex flex-row align-items-center">
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>Tanggal</span>
                                <span>Waktu Mulai</span>
                                <span>Waktu Selesai</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>: {props.item.Dosen2.ujian.date.toDateString().split(" ")[0]+", "+props.item.Dosen2.ujian.date.toDateString().split(" ")[2]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[1]+" "+props.item.Dosen2.ujian.date.toDateString().split(" ")[3]}</span>
                                <span>: {props.item.Dosen2.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</span>
                                <span>: {props.item.Dosen2.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <span>Mata Kuliah</span>
                                <span>Ruangan</span>
                                <span>Dosen</span>
                            </div>
                            <div className="d-flex flex-column w-100 align-items-start">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="d-flex flex-column w-100 justify-content-center">
                                        {props.item.Dosen2.ujian.matkul.map((item)=>(
                                            <span>: {item.nama}</span>
                                        ))}
                                    </div>
                                </div>
                                <span>: {props.item.Dosen2.ruangan.nama}</span>
                                <span>: {props.item.Dosen2.dosen.nama}</span>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        <div className="d-flex flex-row">
                            <div className="d-flex flex-column w-100">
                                <div className="py-1">Admin</div>
                                <div className="py-1">Dosen</div>
                            </div>
                            <div className="d-flex flex-column w-100">
                                <div className="d-flex flex-row py-1"> 
                                    {props.item.pertukaran.statusAdmin.toString()=="Belum Disetujui" ? <>: <Badge pill bg="warning"> Belum Disetujui</Badge></> : null}
                                    {props.item.pertukaran.statusAdmin.toString()=="Disetujui" ? <Badge pill bg="success">Disetujui</Badge> : null}
                                    {props.item.pertukaran.statusAdmin.toString()=="Ditolak" ? <Badge pill bg="danger">Ditolak</Badge> : null}
                                </div>
                                <div className="d-flex flex-row py-1"> 
                                    {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? <>: <Badge pill bg="warning">Belum Disetujui</Badge></> : null}
                                    {props.item.pertukaran.statusDosen2.toString()=="Disetujui" ? <Badge pill bg="success">Disetujui</Badge> : null}
                                    {props.item.pertukaran.statusDosen2.toString()=="Ditolak" ? <Badge pill bg="danger">Ditolak</Badge> : null}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="text-center">
                        {props.item.pertukaran.statusDosen2.toString()=="Belum Disetujui" ? 
                            <div className="d-flex flex-row justify-content-center">
                                <DeleteButton page={"Pertukaran Jadwal"} idPertukaran1={props.item.Dosen1.id} idPertukaran2={props.item.Dosen2.id} pertukaran={props.pertukaran} setPertukaran={props.setPertukaran}/>
                            </div>
                        :
                            null
                        }
                    </td>
                </tr>
            </tbody> 
        </>
    )
}

export default ItemPengajuanSaya;