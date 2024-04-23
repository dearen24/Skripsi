import EditUjian from "@/app/components/ujian/EditUjian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function UbahMatkulUjian({params}:any){
    await getSessionServerAdmin();
    return(
        <EditUjian params={params.id}/>
    )
}