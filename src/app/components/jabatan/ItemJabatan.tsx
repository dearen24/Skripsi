"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemJabatan = (jabatan) => {

    return(
        <tbody>
            <tr>
                <td className="text-center" id="idJabatan" hidden>{jabatan.role.id}</td>
                <td className="text-center">{jabatan.role.nama}</td>
                <td className="text-center">{jabatan.role.kuotaMengawas}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Jabatan"} idJabatan={jabatan.role.id}/>
                        <DeleteButton page={"Jabatan"} idJabatan={jabatan.role.id} jabatan={jabatan.jabatan} setJabatan={jabatan.setJabatan}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemJabatan;