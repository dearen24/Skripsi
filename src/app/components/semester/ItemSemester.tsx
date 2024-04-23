"use client"
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import { Badge } from "react-bootstrap";

const ItemSemester = (semester) => {

    return(
        <tbody>
            <tr>
                <td className="text-center">{semester.sem.semester}</td>
                {semester.sem.status==false ? <td className="text-center"><Badge pill bg="danger">Tidak Aktif</Badge></td> : <td className="text-center"><Badge pill bg="success">Aktif</Badge></td>}
                <td className="text-center">
                    <div className="d-flex flex-row justify-content-center">
                        <EditButton page={"Semester"} idSemester={semester.sem.id}/>
                        <DeleteButton page={"Semester"} idSemester={semester.sem.id} semester={semester.semester} setSemester={semester.setSemester}/>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

export default ItemSemester;