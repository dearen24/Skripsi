import AddUjian from "@/app/components/ujian/AddUjian";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahMatkulUjian(){
    const session = await getSessionServerAdmin();
    return(
        <AddUjian props={session}/>
    )
}