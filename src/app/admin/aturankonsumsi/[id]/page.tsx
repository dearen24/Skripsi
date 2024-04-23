import EditAturan from "@/app/components/aturankonsumsi/EditAturan";
import EditRole from "@/app/components/jabatan/EditJabatan";
import { getSessionServerAdmin } from "@/modules/session"

export default async function EditUser({params}:any){
    await getSessionServerAdmin();
    return(
        <EditAturan params={params.id}/>
    )
}