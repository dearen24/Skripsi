import PDFRekapMengawas from "@/app/components/pdf/PDFRekapMengawas";
import PDFRekapMengawasTest from "@/app/components/pdf/PDFRekapMengawasTest";
import { getSessionServerAdmin } from "@/modules/session";

export default async function RekapMengawas({params}){
    const session = await getSessionServerAdmin();
    return(
        <PDFRekapMengawasTest props={session} params={params}/>
    )
}