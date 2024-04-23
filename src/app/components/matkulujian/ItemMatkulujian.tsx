"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";

const ItemMatkulUjian = (matkulujian) => {
    
    return(
        <tbody>
            <tr>
                <td className="text-center">{matkulujian.matkulujian.semester.semester}</td>
                <td className="text-center">{matkulujian.matkulujian.matkul.nama}</td>
                <td className="text-center">
                    {matkulujian.matkulujian.dosenPengajar.map((dosen)=>(
                        <div><a>{dosen.nama}</a></div>    
                    ))}
                </td>                        
                <td className="text-center">{matkulujian.matkulujian.peserta}</td>
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id}/>
                        <DeleteButton page={"Mata Kuliah Ujian"} idMatkulujian={matkulujian.matkulujian.id} matkulujian={matkulujian.allmatkulujian} setMatkulujian={matkulujian.setMatkulujian}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemMatkulUjian;