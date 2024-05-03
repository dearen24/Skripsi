"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemKonsumsi = (konsumsi) => {

    const date = String(konsumsi.konsum.date).split(" ");

    return(
        <tbody>
            <tr>
                <td className="text-center">{date[0]+", "+date[1]+" "+date[2]+" "+date[3]}</td>
                <td className="text-center">{konsumsi.konsum.lunch}</td>
                <td className="text-center">{konsumsi.konsum.snack}</td>
                <td className="text-center" style={{whiteSpace: "pre-line"}}>{konsumsi.konsum.description}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Konsumsi Non-Pengawas"} idKonsumsi={konsumsi.konsum.id}/>
                        <DeleteButton page={"Konsumsi Non-Pengawas"} idKonsumsi={konsumsi.konsum.id} konsumsi={konsumsi.konsumsi} setKonsumsi={konsumsi.setKonsumsi}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemKonsumsi;