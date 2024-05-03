"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { useEffect, useState } from "react";
import { getMatkulujianByMatkulId } from "@/app/actions/matkulujian";

const ItemUjian = (ujian) => {
    const date = String(ujian.ujian.date).split(" ");
    const mulai = String(ujian.ujian.mulai).split(" ")[4].substring(0,5);
    const selesai = String(ujian.ujian.selesai).split(" ")[4].substring(0,5);

    return(
        <tbody>
            <tr>
                <td className="text-center">{date[0]+", "+date[1]+" "+date[2]+" "+date[3]}</td>
                <td className="text-center">{mulai}</td>
                <td className="text-center">{selesai}</td>                        
                <td className="text-center">{ujian.ujian.metode}</td>
                <td className="text-center">{ujian.ujian.tipe}</td>
                <td className="text-center">{ujian.ujian.shift}</td>
                <td className="text-center">{ujian.ujian.semester.semester}</td>
                <td className="text-center">
                    {ujian.ujian.matkul.map((matkul)=>(
                        <div><a>{matkul.nama}</a></div>    
                    ))}
                </td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Ujian"} idUjian={ujian.ujian.id}/>
                        <DeleteButton page={"Ujian"} idUjian={ujian.ujian.id} ujian={ujian.allUjian} setUjian={ujian.setUjian}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemUjian;