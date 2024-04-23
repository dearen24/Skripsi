import { getSessionServerAdmin } from "@/modules/session";
import MainMatkulUjian from "@/app/components/matkulujian/MainMatkulujian";

export default async function Pengguna(){
    const session = await getSessionServerAdmin();
    return(
        <MainMatkulUjian props={session}/>
    )
}