import EditUjian from "@/app/components/ujian/EditUjian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function UbahMatkulUjian({params}:any){
    const session = await getSessionServerAdmin();
    return(
        <EditUjian params={params.id} props={session}/>
    )
}