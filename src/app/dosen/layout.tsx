"use client"
import { useSession } from "next-auth/react"
import Providers from "../components/SessionProvider"
import SidebarDosen from "../components/SideBarDosen"
import Link from "next/link"
import { Suspense } from "react"
import LoadingPengguna from "./jadwal/loading"


export default function DosenLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const {data: session} = useSession();
    const userSession = session?.user?.name;
    return (
      <div className="container-fluid d-flex h-100 p-0">
        <div className="d-flex flex-row pe-1">
          <SidebarDosen session={userSession}/>
        </div>
        <div className="w-100 pe-1">
          {children}
        </div>
      </div>
    )
  }