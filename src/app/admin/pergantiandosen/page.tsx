import { getSessionServerAdmin } from "@/modules/session";
import MainListGantiJadwal from "@/app/components/gantijadwal/MainListGantiJadwal";

export default async function GantiJadwalAdmin(){
    const session = await getSessionServerAdmin();
    return(
        <MainListGantiJadwal props={session}/>
    )
}