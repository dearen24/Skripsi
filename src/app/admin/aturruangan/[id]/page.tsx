import EditRuanganUjian from "@/app/components/setruangan/EditRuanganUjian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function UbahMatkulUjian({params}:any){
    await getSessionServerAdmin();
    return(
        <EditRuanganUjian params={params.id}/>
    )
}