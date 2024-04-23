"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemRuangan = (ruangan) => {

    return(
        <tbody>
            <tr>
                <td className="text-center">{ruangan.class.nama}</td>
                <td className="text-center">{ruangan.class.kapasitas}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Ruangan"} idRuangan={ruangan.class.id}/>
                        <DeleteButton page={"Ruangan"} idRuangan={ruangan.class.id} ruangan={ruangan.ruangan} setRuangan={ruangan.setRuangan}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemRuangan;