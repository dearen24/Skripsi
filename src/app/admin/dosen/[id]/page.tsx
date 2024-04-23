import EditUser from "@/app/components/pengguna/EditPengguna";
import { getSessionServerAdmin } from "@/modules/session";

export default async function EditPengguna({params}:any){
    await getSessionServerAdmin();
    return(
        <EditUser params={params.id}/>
    )
}