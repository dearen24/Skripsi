import AddRole from "@/app/components/jabatan/AddJabatan";
import AddKonsumsiNonPengawas from "@/app/components/konsumsi/AddKonsumsiNonPengawas";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahKonsumsiNon(){
    const session = await getSessionServerAdmin();
    return(
        <AddKonsumsiNonPengawas props={session}/>
    )
}