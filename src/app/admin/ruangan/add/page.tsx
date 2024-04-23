import AddClass from "@/app/components/ruangan/AddRuangan";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahJabatan(){
    await getSessionServerAdmin();
    return(
        <AddClass/>
    )
}