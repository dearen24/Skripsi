import { getSessionServerAdmin } from "@/modules/session";
import MainPengguna from "@/app/components/pengguna/MainPengguna";

export default async function Pengguna(){
    await getSessionServerAdmin();
    return(
        <MainPengguna/>
    )
}