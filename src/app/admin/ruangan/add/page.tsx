import AddClass from "@/app/components/ruangan/AddRuangan";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahJabatan(){
    const session = await getSessionServerAdmin();
    return(
        <AddClass/>
    )
}