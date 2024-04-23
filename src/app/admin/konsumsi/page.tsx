import MainKonsumsi from "@/app/components/konsumsi/MainKonsumsi";
import { getSessionServerAdmin } from "@/modules/session";

export default async function Jabatan(){
    const session = await getSessionServerAdmin();
    return(
        <MainKonsumsi props={session}/>
    )
}