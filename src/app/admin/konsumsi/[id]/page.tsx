import EditKonsumsiNonPengawas from "@/app/components/konsumsi/EditKonsumsiNonPengawas";
import { getSessionServerAdmin } from "@/modules/session";

export default async function EditKonsumsiNon({params}:any){
    const session = await getSessionServerAdmin();
    return(
        <EditKonsumsiNonPengawas params={params.id}/>
    )
}