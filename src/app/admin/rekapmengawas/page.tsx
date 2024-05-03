import MainRekapMengawas from "@/app/components/rekapmengawas/MainRekapMengawas";
import { getSessionServerAdmin } from "@/modules/session";

export default async function RekapMengawas(){
    const session = await getSessionServerAdmin();
    return(
        <MainRekapMengawas props={session}/>
    )
}