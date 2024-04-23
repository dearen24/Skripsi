"use client"
import { Table } from "react-bootstrap";

const ItemJadwalDosenLain = (props) => {

    const setSelected = (e) => {
        props.setSelectedJadwalDosenLain(e.target.parentElement.id);
    }

    const clearSelection = (e) => {
        props.setSelectedJadwalDosenLain("");
    }

    return(
        <>
            <h6>Pilih jadwal dosen yang akan ditukar</h6>
            <button className="btn btn-primary" onClick={clearSelection}>Clear Selection</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Mata Kuliah</th>
                        <th>Ruangan</th>
                        <th>Dosen</th>
                    </tr>
                </thead>
                <tbody>
                    {props.jadwaldosenlain.map((jadwal)=>(
                        props.selectedJadwalDosenLain == jadwal.id?
                        <tr className="table-success" onClick={setSelected} id={jadwal.id}>
                            <td>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</td>
                            <td>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</td>
                            <td>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</td>
                            <td className="d-flex flex-column">
                                {jadwal.ujian.matkul.map((matkul)=>(
                                    <span>{matkul.nama}</span>
                                ))}
                            </td>
                            <td>{jadwal.ruangan.nama}</td>
                            <td>{jadwal.dosen.nama}</td>
                        </tr>
                        :
                        <tr onClick={setSelected} id={jadwal.id}>
                            <td>{jadwal.ujian.date.toDateString().split(" ")[0]+", "+jadwal.ujian.date.toDateString().split(" ")[2]+" "+jadwal.ujian.date.toDateString().split(" ")[1]+" "+jadwal.ujian.date.toDateString().split(" ")[3]}</td>
                            <td>{jadwal.ujian.mulai.toTimeString().split(" ")[0].substring(0,5)}</td>
                            <td>{jadwal.ujian.selesai.toTimeString().split(" ")[0].substring(0,5)}</td>
                            <td className="d-flex flex-column">
                                {jadwal.ujian.matkul.map((matkul)=>(
                                    <span>{matkul.nama}</span>
                                ))}
                            </td>
                            <td>{jadwal.ruangan.nama}</td>
                            <td>{jadwal.dosen.nama}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ItemJadwalDosenLain;