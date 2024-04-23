"use client"
import { useSession } from "next-auth/react"
import SidebarAdmin from "../components/SideBarAdmin"


export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const {data: session} = useSession();
    const userSession = session?.user?.name;
    return (
      <div className="container-fluid d-flex h-100 p-0">
        <div className="d-flex flex-row pe-1">
          <SidebarAdmin session={userSession}/>
        </div>
        <div className="w-100 pe-1">
          {children}
        </div>
      </div>
    )
  }