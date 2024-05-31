import { getSessionServerAdmin } from "@/modules/session";
import MainPertukaranAdmin from "@/app/components/tukarjadwal/MainPertukaranDosenAdmin";
import MainGantiJadwal from "@/app/components/gantijadwal/MainGantijadwal";

export default async function GantiJadwalAdmin(){
    const session = await getSessionServerAdmin();
    return(
        <MainGantiJadwal props={session}/>
    )
}