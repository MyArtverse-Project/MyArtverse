import dynamic from "next/dynamic"
import type { PropsWithChildren } from "react"
import Navbar from "./Navbar"
import { SidebarFallback } from "./Sidebar"

const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <SidebarFallback />
})

export function StudioLayout(props: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="relative flex h-[calc(100dvh-6rem)]">
        <Sidebar />
        <main data-mav-studio-layout-slot="" className="flex-1" id="skip-to-content">
          {props.children}
        </main>
      </div>
    </>
  )
}
