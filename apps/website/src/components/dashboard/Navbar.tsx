"use client"

import { sidebarToggleDashboard } from "@/atoms"
import { Avatar, Button } from "@/components/ui/Buttons"
import { useAtom } from "jotai"
import {
  LuBell as BellIcon,
  LuHelpCircle as HelpCircleIcon,
  LuAlbum,
  LuCat,
  LuFileLock,
  LuShare,
  LuMenu as MenuIcon,
  LuPlus as PlusIcon,
  LuSearch as SearchIcon
} from "react-icons/lu"
import type { UserType } from "@/types/users"
import NavbarLogo from "./NavbarLogo"
import NavbarSearch from "./NavbarSearch"

export default function DashboardNavbar({ userData }: { userData: UserType }) {
  const [isToggled, setIsToggled] = useAtom(sidebarToggleDashboard)
  const createNewItems = [
    { icon: LuCat, name: "New fursona" },
    { icon: LuShare, name: "Upload image(s)" },
    { icon: LuAlbum, name: "New collection" },
    { icon: LuFileLock, name: "New private note" }
  ]

  return (
    <nav className="font-inter bg-100 border-b-mute relative z-20 flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium">
      {/* Left side */}
      <div className="font-inter relative flex items-center gap-x-2.5">
        <Button iconOnly variant="tritery" onClick={() => setIsToggled(!isToggled)}>
          <MenuIcon size={21} />
        </Button>
        <NavbarLogo />
      </div>
      {/* Search input */}
      <NavbarSearch />
      {/* Right side: actions */}
      <div className="flex items-center gap-x-1.5">
        <Button iconOnly variant="tritery">
          <HelpCircleIcon size={21} />
        </Button>
        <Button iconOnly variant="tritery">
          <BellIcon size={21} />
        </Button>
        <Button variant="secondary" prefixIcon={<PlusIcon size={21} />}>
          Create
        </Button>
        <span className="ml-3">
          <Avatar
            src={userData.avatarUrl || "/UserProfile.png"}
            size={32}
          />
        </span>
      </div>
    </nav>
  )
}
