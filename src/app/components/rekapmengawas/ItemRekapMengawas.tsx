"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge } from "react-bootstrap";

const ItemRekapMengawas = (rekap) => {
   
    return(
        <tbody>
            <tr>
                <td className="text-center">{rekap.rekap.nama}</td>
                <td className="text-center">{rekap.rekap._count.idDosen}</td>
            </tr>
        </tbody>
    )
}

export default ItemRekapMengawas;