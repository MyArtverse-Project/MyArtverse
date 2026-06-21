"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import Link from "next/link"
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
        <div className="flex items-center gap-x-2.5">
          <Link
            href="/"
            className="group flex items-center gap-x-2.5 text-foreground duration-300"
          >
            <MyArtverseIcon logoOnly />
            <span className="relative text-2xl font-bold leading-none" translate="no">
              <span className="block transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:opacity-0">
                Studio
              </span>
              <span className="pointer-events-none absolute left-0 top-0 z-10 whitespace-nowrap  bg-background/95 opacity-0 transition-all duration-300 ease-out translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
                Back to MyArtverse
              </span>
            </span>
          </Link>
          <Badge variant="outline" className="shrink-0 gap-1">
            <LuTestTube2 className="size-3" />
            Development
          </Badge>
        </div>
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
