"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import {
  LuBell,
  LuHelpCircle,
  LuMenu,
  LuPlus,
  LuTestTube2
} from "react-icons/lu"
import { useSidebarOpenAtom } from "./Sidebar.atom"

export default function Navbar() {
  const { sidebarState, setSidebarState } = useSidebarOpenAtom()

  return (
    <nav className="bg-background/80 border-border supports-[backdrop-filter]:bg-background/60 relative z-20 flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium backdrop-blur">
      <div className="flex items-center gap-x-2.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar"
          onClick={() => setSidebarState(!sidebarState)}
        >
          <LuMenu size={21} />
        </Button>
        <MyArtverseIcon logoOnly />
        <span className="text-2xl font-bold" translate="no">
          Studio
        </span>
        <Badge variant="outline" className="gap-1">
          <LuTestTube2 className="size-3" />
          Development
        </Badge>
      </div>
      <div className="flex items-center gap-x-1.5">
        <Button variant="ghost" size="icon" aria-label="Help">
          <LuHelpCircle size={21} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <LuBell size={21} />
        </Button>
        <Button variant="secondary">
          <LuPlus size={21} />
          Create
        </Button>
      </div>
    </nav>
  )
}
