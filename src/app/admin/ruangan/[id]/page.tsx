import EditClass from "@/app/components/ruangan/EditRuangan";
import { getSessionServerAdmin } from "@/modules/session"

export default async function EditUser({params}:any){
    await getSessionServerAdmin();
    return(
        <EditClass params={params.id}/>
    )
}