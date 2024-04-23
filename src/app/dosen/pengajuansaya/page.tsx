import { getSessionServerDosen } from "@/modules/session";
import MainPengajuanSaya from "@/app/components/tukarjadwal/MainPengajuanSaya";

export default async function AturRuanganUjian(){
    const session = await getSessionServerDosen();
    console.log("SESSION",session);
    return(
        <MainPengajuanSaya props={session}/>
    )
}