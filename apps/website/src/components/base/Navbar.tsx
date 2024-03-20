"use client"

import { sidebarToggle } from "@/atoms"
import { useAtom } from "jotai"
import { LuMenu } from "react-icons/lu"
import type { UserType } from "@/types/users"
import { Separator } from "../ui"
import { Button, SearchButton } from "../ui/Buttons"
import NavbarLogo from "./NavbarLogo"
import NavbarUserActions from "./NavbarUserActions"
import ProfileBreadcrumb from "./ProfileBreadcrumb"

export default function Navbar({ userData }: { userData: UserType }) {
  const [open, setOpen] = useAtom(sidebarToggle)
  // TODO: Implement User Data onto sidebar
  // const USER_PLACEHOLDER = "VulpoTheDev"
  // const HANDLE_PLACEHOLDER = `@${toLower(USER_PLACEHOLDER)}`

  return (
    <nav className="font-inter bg-100 relative flex select-none items-center justify-between px-5 py-3 text-sm font-medium">
      {/* Navbar left side */}
      <div className="flex h-5 items-center gap-x-3">
        <Button
          icon={<LuMenu size={20} />}
          variant="tritery"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        />
        <NavbarLogo />
        <ProfileBreadcrumb />
      </div>
      {/* Navbar right side */}
      <div className="flex items-center gap-x-2.5">
        <div className="desktop-only-md">
          <SearchButton />
        </div>
        <Separator dir="vertical" size="2.125rem" />
        <NavbarUserActions user={userData} isRegistered={userData ? true : false} />
      </div>
    </nav>
  )
}
