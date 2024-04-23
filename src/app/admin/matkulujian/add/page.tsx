import AddMatkulUjian from "@/app/components/matkulujian/AddMatkulujian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahMatkulUjian(){
    await getSessionServerAdmin();
    return(
        <AddMatkulUjian/>
    )
}