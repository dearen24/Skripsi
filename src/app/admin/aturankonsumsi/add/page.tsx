import AddAturan from "@/app/components/aturankonsumsi/AddAturan";
import AddRole from "@/app/components/jabatan/AddJabatan";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahJabatan(){
    await getSessionServerAdmin();
    return(
        <AddAturan/>
    )
}