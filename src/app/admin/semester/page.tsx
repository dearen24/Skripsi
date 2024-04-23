import MainSemester from "@/app/components/semester/MainSemester";
import { getSessionServerAdmin } from "@/modules/session";

export default async function Semester(){
    await getSessionServerAdmin();
    return(
        <MainSemester/>
    )
}