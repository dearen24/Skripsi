import EditMatkulUjian from "@/app/components/matkulujian/EditMatkulujian";
import EditUser from "@/app/components/pengguna/EditPengguna";
import { getSessionServerAdmin } from "@/modules/session";

export default async function UbahMatkulUjian({params}:any){
    await getSessionServerAdmin();
    return(
        <EditMatkulUjian params={params.id}/>
    )
}