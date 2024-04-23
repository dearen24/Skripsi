"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge } from "react-bootstrap";

const ItemMatkul = (matakuliah) => {
    console.log(matakuliah.matakuliah);
    return(
        <tbody>
            <tr>
                <td className="text-center">{matakuliah.matakuliah.kode}</td>
                <td className="text-center">{matakuliah.matakuliah.nama}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id}/>
                        <DeleteButton page={"Mata Kuliah"} idMatkul={matakuliah.matakuliah.id} matkul={matakuliah.matkul} setMatkul={matakuliah.setMatkul}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemMatkul;