import AddUjian from "@/app/components/ujian/AddUjian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahMatkulUjian(){
    await getSessionServerAdmin();
    return(
        <AddUjian/>
    )
}