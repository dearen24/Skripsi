import { getSessionServerDosen } from "@/modules/session";
import MainPengawas from "@/app/components/setdosen/MainPengawas";
import MainJadwal from "@/app/components/jadwal/MainJadwal";
import MainPengajuanLain from "@/app/components/tukarjadwal/MainPengajuanLain";

export default async function AturRuanganUjian(){
    const session = await getSessionServerDosen();
    return(
        <MainPengajuanLain props={session}/>
    )
}