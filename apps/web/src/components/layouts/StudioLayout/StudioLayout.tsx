"use client"

import dynamic from "next/dynamic"
import Navbar from "./Navbar"
import { SidebarFallback } from "./Sidebar"
import { useAuth } from "@/app/context/AuthContext"
import { redirect } from "next/navigation"

const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <SidebarFallback />
})

export function StudioLayout(props: React.PropsWithChildren) {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) return redirect("/login")
  return (
    <>
      <Navbar />
      <div className="relative flex h-[calc(100dvh-6rem)]">
        <Sidebar user={user} />
        <main
          data-mav-studio-layout-slot=""
          className="flex-1"
          id="skip-to-content"
        >
          {props.children}
        </main>
      </div>
    </>
  )
}
