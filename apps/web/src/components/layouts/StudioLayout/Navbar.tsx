"use client"

import { Badge } from "@mav/ui/components/badges"
import { Button } from "@mav/ui/components/buttons"
import { MyArtverseIcon } from "@mav/ui/icons"
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
    <nav className="bg-100 border-b-mute relative z-20 flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium">
      <div className="flex items-center gap-x-2.5">
        <Button
          icon={<LuMenu size={21} />}
          variant="tritery"
          onClick={() => setSidebarState(!sidebarState)}
        />
        <MyArtverseIcon logoOnly />
        <span className="text-2xl font-bold" translate="no">
          Studio
        </span>
        <Badge variant="warning" icon={LuTestTube2}>
          Development
        </Badge>
      </div>
      <div className="flex items-center gap-x-1.5">
        <Button icon={<LuHelpCircle size={21} />} variant="tritery" />
        <Button icon={<LuBell size={21} />} variant="tritery" />
        <Button prefix={<LuPlus size={21} />} variant="secondary">
          Create
        </Button>
      </div>
    </nav>
  )
}
