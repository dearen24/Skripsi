import { getSessionServerAdmin } from "@/modules/session";
import MainPengawas from "@/app/components/setdosen/MainPengawas";

export default async function AturRuanganUjian(){
    const session = await getSessionServerAdmin();
    return(
        <MainPengawas props={session}/>
    )
}