"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@mav/ui/components/buttons"
import { MyArtverseIcon } from "@mav/ui/icons"
import { LuMenu, LuSearch } from "react-icons/lu"
import { ActionsLoggedIn } from "./ActionsLoggedIn"
import { ActionsLoggedOut } from "./ActionsLoggedOut"
import { Sidebar } from "@/components/layouts/AppLayout/Sidebar/Sidebar"

export function Navbar() {
  const { user, isLoading } = useAuth()
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const toggleSidebar = () => setSidebarOpened((prev) => !prev)

  return (
    <div className="sticky top-0 z-50">
      <nav className="font-inter bg-100 relative flex select-none items-center justify-between px-5 py-3 text-sm font-medium">
        <div className="flex flex-row items-center gap-x-2">
          <Button
            icon={<LuMenu size={20} />}
            onClick={toggleSidebar}
            variant="tritery"
          />
          <Sidebar
            sidebarOpened={sidebarOpened}
            toggleSidebar={toggleSidebar}
            user={user}
          />
          <Link href="/" aria-label="Home" draggable={false}>
            <MyArtverseIcon size={0.69} />
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            prefix={<LuSearch size={18} />}
            className="hover:!bg-100 w-64"
            variant="secondary"
          >
            Search
          </Button>
          {!isLoading && (user ? <ActionsLoggedIn user={user} isRegistered={true} /> : <ActionsLoggedOut />)}
        </div>
      </nav>
    </div>
  )
}
