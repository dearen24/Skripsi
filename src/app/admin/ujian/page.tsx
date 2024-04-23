import { getSessionServerAdmin } from "@/modules/session";
import MainUjian from "@/app/components/ujian/MainUjian";

export default async function Ujian(){
    const session = await getSessionServerAdmin();
    return(
        <MainUjian props={session}/>
    )
}