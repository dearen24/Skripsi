import { useSession } from "next-auth/react"
import Providers from "../components/SessionProvider"
import SidebarDosen from "../components/SideBarDosen"
import Link from "next/link"
import { Suspense } from "react"
import LoadingPengguna from "./jadwal/loading"
import { getSessionServerDosen } from "@/modules/session"


export default async function DosenLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session = await getSessionServerDosen();

    return (
      <div className="container-fluid d-flex h-100 p-0">
        <div className="d-flex flex-row pe-1 mb-5 h-100" style={{position:"fixed",width:"275px", backgroundColor:"#272829"}}>
          <SidebarDosen session={session.name}/>
        </div>
        <div className="w-100 pe-1 mr-1" style={{marginLeft:"277px"}}>
          {children}
        </div>
      </div>
    )
  }