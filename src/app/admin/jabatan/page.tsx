import MainJabatan from "@/app/components/jabatan/MainJabatan";
import { getSessionServerAdmin } from "@/modules/session";

export default async function Jabatan(){
    await getSessionServerAdmin();
    return(
        <MainJabatan/>
    )
}