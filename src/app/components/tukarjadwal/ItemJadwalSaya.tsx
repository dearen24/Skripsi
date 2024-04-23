"use client"
import { Table } from "react-bootstrap";

const ItemJadwalSaya = (props) => {

    const setSelected = (e) => {
        props.setSelectedJadwalSaya(e.target.parentElement.id);
    }

    const clearSelection = (e) => {
        props.setSelectedJadwalSaya("");
    }

    return(
        <>
            <h6>Pilih jadwal Anda yang ingin ditukar</h6>
            <button className="btn btn-primary" onClick={clearSelection}>Clear Selection</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Mata Kuliah</th>
                        <th>Ruangan</th>
                    </tr>
                </thead>
                <tbody>
                    {props.jadwalsaya.map((jadwal)=>(
                        props.selectedJadwalSaya == jadwal.id?
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default ItemJadwalSaya;