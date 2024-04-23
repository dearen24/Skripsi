import MainRuangan from "@/app/components/ruangan/MainRuangan";
import { getSessionServerAdmin } from "@/modules/session";

export default async function Ruangan(){
    await getSessionServerAdmin();
    return(
        <MainRuangan/>
    )
}