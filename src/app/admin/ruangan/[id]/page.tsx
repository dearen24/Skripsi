import EditClass from "@/app/components/ruangan/EditRuangan";
import { getSessionServerAdmin } from "@/modules/session"

export default async function EditUser({params}:any){
    const session = await getSessionServerAdmin();
    return(
        <EditClass params={params.id}/>
    )
}