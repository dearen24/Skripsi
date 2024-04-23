import { getSessionServerAdmin } from "@/modules/session";
import MainPertukaranAdmin from "@/app/components/tukarjadwal/MainPertukaranDosenAdmin";

export default async function AturRuanganUjian(){
    const session = await getSessionServerAdmin();
    return(
        <MainPertukaranAdmin props={session}/>
    )
}