import AddUser from "@/app/components/pengguna/AddPengguna";
import { getSessionServerAdmin } from "@/modules/session";

export default async function TambahPengguna(){
    await getSessionServerAdmin();
    return(
        <AddUser/>
    )
}