import EditSemester from "@/app/components/semester/EditSemester";
import { getSessionServerAdmin } from "@/modules/session"

export default async function EditClassroom({params}:any){
    await getSessionServerAdmin();
    return(
        <EditSemester params={params.id}/>
    )
}