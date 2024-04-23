"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemAturan = (aturan) => {
    
    return(
        <tbody>
            <tr>
                <td className="text-center">{aturan.index}</td>
                <td className="text-center">{aturan.rule.sebelum12.toString()}</td>
                <td className="text-center">{aturan.rule.melewati12.toString()}</td>
                <td className="text-center">{aturan.rule.setelah12.toString()}</td>
                <td className="text-center">{aturan.rule.konsumsi.toString()}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id}/>
                        <DeleteButton page={"Aturan Konsumsi"} idAturan={aturan.rule.id} aturan={aturan.aturan} setAturan={aturan.setAturan}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemAturan;