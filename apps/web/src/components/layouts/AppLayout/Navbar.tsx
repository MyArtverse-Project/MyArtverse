"use client"

import { useAuth } from "@/app/context/AuthContext"
import { NavbarScrollTitle } from "@/components/layouts/AppLayout/NavbarScrollTitle"
import { useScrollTitle } from "@/components/layouts/AppLayout/ScrollTitleContext"
import { Sidebar } from "@/components/layouts/AppLayout/Sidebar/Sidebar"
import { Button } from "@/components/ui/button"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"
import { LuMenu } from "react-icons/lu"
import { ActionsLoggedIn } from "./ActionsLoggedIn"
import { ActionsLoggedOut } from "./ActionsLoggedOut"
import { SearchBar } from "@/components/Search"

export function Navbar() {
  const { user, isLoading } = useAuth()
  const { scrollTitle, showTitle } = useScrollTitle()
  const [sidebarOpened, setSidebarOpened] = useState(false)
  const toggleSidebar = () => setSidebarOpened((prev) => !prev)

  return (
    <div className="sticky top-0 z-50">
      <nav className="font-inter bg-background/80 border-border supports-[backdrop-filter]:bg-background/60 relative flex select-none items-center justify-between border-b px-5 py-3 text-sm font-medium backdrop-blur">
        <div className="flex min-w-0 flex-row items-center gap-x-2">
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
          <div className="relative flex min-w-0 items-center">
            <Link
              href="/"
              aria-label="Home"
              draggable={false}
              className={cn(
                "transition-all duration-300 ease-out",
                showTitle && scrollTitle
                  ? "pointer-events-none -translate-y-1 opacity-0"
                  : "translate-y-0 opacity-100"
              )}
            >
              <MyArtverseIcon size={0.8} />
            </Link>
            {scrollTitle && (
              <NavbarScrollTitle data={scrollTitle} visible={showTitle} />
            )}
          </div>
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
