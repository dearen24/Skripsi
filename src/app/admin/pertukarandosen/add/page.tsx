import { getSessionServerAdmin } from "@/modules/session";
import MainPengajuanTukarAdmin from "@/app/components/tukarjadwal/MainPengajuanTukarAdmin";

export default async function AddPertukaranDosenAdminUjian(){
    const session = await getSessionServerAdmin();
    return(
        <MainPengajuanTukarAdmin props={session}/>
    )
}