"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebarContext } from "@/context"
import { toLower } from "lodash"
import { LuMenu } from "react-icons/lu"
import { MyFursonaIcon } from "../icons"
import { Separator } from "../ui"
import { Button, SearchButton } from "../ui/Buttons"
import NavbarProfilePeek from "./NavbarProfilePeek"
import NavbarUserActions from "./NavbarUserActions"

export default function Navbar() {
  const { sidebarState: isSidebarOpen, setSidebarState } = useSidebarContext()

  // TODO: Implement User Data onto sidebar
  const USER_PLACEHOLDER = "VulpoTheDev"
  const HANDLE_PLACEHOLDER = `@${toLower(USER_PLACEHOLDER)}`

  const pathname = usePathname()
  const disableSidebar = pathname == "/login" || pathname == "/register"

  return (
    <nav className="font-inter bg-100 relative flex select-none items-center justify-between px-5 py-3 text-sm font-medium">
      {/* Navbar left side */}
      <div className="flex h-5 items-center gap-x-3">
        {!disableSidebar ? (
          <Button
            iconOnly
            variant="tritery"
            onClick={() => setSidebarState(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <LuMenu size={20} />
          </Button>
        ) : null}
        <div className="desktop-only-lg">
          <NavbarProfilePeek />
        </div>
        <div className="mobile-only-lg">
          <Link href="/" aria-label="Home" title="Home">
            <MyFursonaIcon logoOnly />
          </Link>
        </div>
      </div>
      {/* Navbar right side */}
      <div className="flex items-center gap-x-2.5">
        {!disableSidebar ? (
          <>
            <div className="desktop-only-md">
              <SearchButton />
            </div>
            <Separator dir="vertical" size="2.125rem" />
          </>
        ) : null}
        <NavbarUserActions user={USER_PLACEHOLDER} handle={HANDLE_PLACEHOLDER} />
      </div>
    </nav>
  )
}
