import MainMatkul from "@/app/components/matkul/MainMatkul";
import { getSessionServerAdmin } from "@/modules/session";

export default async function MataKuliah(){
    await getSessionServerAdmin();
    return(
        <MainMatkul/>
    )
}