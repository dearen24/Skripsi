import { getSessionServerDosen } from "@/modules/session";
import MainPengawas from "@/app/components/setdosen/MainPengawas";
import MainJadwal from "@/app/components/jadwal/MainJadwal";

export default async function AturRuanganUjian(){
    const session = await getSessionServerDosen();
    return(
        <MainJadwal props={session}/>
    )
}