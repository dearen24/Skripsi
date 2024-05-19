import { useSession } from "next-auth/react"
import SidebarAdmin from "../components/SideBarAdmin"
import { getSessionServerAdmin } from "@/modules/session"


export default async function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session = await getSessionServerAdmin();

    return (
      <div className="d-flex p-0 h-100" style={{backgroundColor:"#D8D9DA"}}>
        <div className="d-flex flex-row pe-1 mb-5 h-100" style={{position:"absolute", width:"300px", overflowY:"scroll" , backgroundColor:"#272829"}}>
          <SidebarAdmin session={session.name}/>
        </div>
        <div className="w-100 pe-1 h-100" style={{marginLeft:"300px"}}>
          {children}
        </div>
      </div>
    )
  }