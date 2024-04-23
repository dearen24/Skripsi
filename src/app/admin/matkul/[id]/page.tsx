import EditMatkul from "@/app/components/matkul/EditMatkul";
import { getSessionServerAdmin } from "@/modules/session"

export default async function EditMataKuliah({params}:any){
    await getSessionServerAdmin();
    return(
        <EditMatkul params={params.id}/>
    )
}