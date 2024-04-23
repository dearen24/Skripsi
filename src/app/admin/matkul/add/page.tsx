import AddMatkul from "@/app/components/matkul/AddMatkul";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahMataKuliah(){
    await getSessionServerAdmin();
    return(
        <AddMatkul/>
    )
}