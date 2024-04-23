import { getSessionServerAdmin } from "@/modules/session";
import MainRuanganUjian from "@/app/components/setruangan/MainRuanganUjian";

export default async function AturRuanganUjian(){
    const session = await getSessionServerAdmin();
    return(
        <MainRuanganUjian props={session}/>
    )
}