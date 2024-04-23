"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemDosen = (dosen) => {

    return(
        <tbody>
            <tr>
                <td className="text-center">{dosen.dosen.nama}</td>
                <td className="text-center">{dosen.dosen.nik}</td>
                <td className="text-center">{dosen.dosen.email}</td>                        
                <td className="text-center">{dosen.dosen.role.nama}</td>
                <td className="text-center">{dosen.dosen.role.kuotaMengawas}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Dosen"} idDosen={dosen.dosen.id}/>
                        <DeleteButton page={"Dosen"} idDosen={dosen.dosen.id} pengguna={dosen.pengguna} setPengguna={dosen.setPengguna}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemDosen;