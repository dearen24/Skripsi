import AddSemester from "@/app/components/semester/AddSemester";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahJabatan(){
    await getSessionServerAdmin();
    return(
        <AddSemester/>
    )
}