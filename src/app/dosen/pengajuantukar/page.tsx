import { getSessionServerDosen } from "@/modules/session";
import MainPengajuanTukar from "@/app/components/tukarjadwal/MainPengajuanTukar";

export default async function AturRuanganUjian(){
    const session = await getSessionServerDosen();
    return(
        <MainPengajuanTukar props={session}/>
    )
}