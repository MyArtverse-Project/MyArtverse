"use client"

import { sidebarToggleDashboard } from "@/atoms"
import { Avatar, Button } from "@/components/ui/Buttons"
import { useAtom } from "jotai"
import {
  LuAlbum,
  LuBell,
  LuCat,
  LuFileLock,
  LuHelpCircle,
  LuMegaphone,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuPlus,
  LuShare
} from "react-icons/lu"
import NavbarLogo from "./NavbarLogo"
import NavbarSearch from "./NavbarSearch"

export default function DashboardNavbar() {
  const [isToggled, setIsToggled] = useAtom(sidebarToggleDashboard)

  const createNewItems = [
    { icon: LuCat, name: "New fursona" },
    { icon: LuShare, name: "Upload image(s)" },
    { icon: LuAlbum, name: "New collection" },
    { icon: LuFileLock, name: "New private note" },
    { icon: LuFileLock, name: "New announcements" }
  ]

  return (
    <nav className="font-inter bg-100 border-b-mute relative z-20 flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium">
      {/* Left side */}
      <div className="font-inter relative flex items-center gap-x-2.5">
        <Button
          icon={
            isToggled ? <LuPanelLeftClose size={21} /> : <LuPanelLeftOpen size={21} />
          }
          variant="tritery"
          onClick={() => setIsToggled(!isToggled)}
        ></Button>
        <NavbarLogo />
      </div>
      {/* Search input */}
      <NavbarSearch />
      {/* Right side: actions */}
      <div className="flex items-center gap-x-1.5">
        <Button icon={<LuHelpCircle size={21} />} variant="tritery" />
        <Button icon={<LuBell size={21} />} variant="tritery" />
        <Button variant="secondary" prefixIcon={<LuPlus size={21} />}>
          Create
        </Button>
        <span className="ml-3">
          <Avatar src={"/UserProfile.png"} size={32} />
        </span>
      </div>
    </nav>
  )
}
