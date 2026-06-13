"use client"

import { useAuth } from "@/app/context/AuthContext"
import { Sidebar } from "@/components/layouts/AppLayout/Sidebar/Sidebar"
import { Button } from "@/components/ui/button"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import Link from "next/link"
import { useState } from "react"
import { LuMenu } from "react-icons/lu"
import { ActionsLoggedIn } from "./ActionsLoggedIn"
import { ActionsLoggedOut } from "./ActionsLoggedOut"
import { SearchBar } from "@/components/Search"

export function Navbar() {
  const { user, isLoading } = useAuth()
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const toggleSidebar = () => setSidebarOpened((prev) => !prev)

  return (
    <div className="sticky top-0 z-50">
      <nav className="font-inter bg-background/80 border-border supports-[backdrop-filter]:bg-background/60 relative flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium backdrop-blur">
        <div className="flex flex-row items-center gap-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="Open menu"
          >
            <LuMenu size={20} />
          </Button>
          <Sidebar
            sidebarOpened={sidebarOpened}
            toggleSidebar={toggleSidebar}
            user={user}
          />
          <Link href="/" aria-label="Home" draggable={false}>
            <MyArtverseIcon size={0.8} />
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <SearchBar recentSearches={user ? user.recentSearches : []} />
          {!isLoading &&
            (user ? (
              <ActionsLoggedIn user={user} isRegistered={true} />
            ) : (
              <ActionsLoggedOut />
            ))}
        </div>
      </nav>
    </div>
  )
}
