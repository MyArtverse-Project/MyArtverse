"use client"

import { useContext } from "react"
import Link from "next/link"

import {
  MenuIcon,
  BellIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon
} from "lucide-react"

import { NavbarContext } from "@/contexts"
import { Avatar, Button, Separator } from "../ui"

export default function Navbar() {
  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)

  return (
    <>
      {/* Skip nav accessibility */}
      <a
        href="#skip-navigation"
        className="z-[999] rounded-2xl bg-white fixed top-3 left-2 px-5 py-1.5 opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
        aria-label="Skip to content"
      >
        Skip to content
      </a>
      <nav className="sticky top-0 flex items-center justify-between px-4 py-3 text-sm font-medium select-none font-inter">
        <div className="flex items-center gap-x-2.5">
          <Button
            iconOnly
            variant="secondary"
            onClick={() => setSidebarState(!isSidebarOpen)}
          >
            <MenuIcon size={20} />
          </Button>
          <Link href="/" aria-label="Home" title="Home">
            MyFursona
          </Link>
        </div>
        <div className="flex items-center gap-x-2.5">
          <Button
            className="flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-red-200 hover:border-red-500 focus:border-red-500"
            prefixIcon={<SearchIcon size={20} />}
          >
            Search
          </Button>
          <Separator dir="horizontal" size="2.125rem" />
          {/* Signed in */}
          <Button
            iconOnly
            variant="secondary"
            aria-label="Add or create item"
            suffixIcon={<ChevronDown size={20} />}
          >
            <PlusIcon size={20} />
          </Button>
          <Button iconOnly variant="secondary" aria-label="Notifications">
            <BellIcon size={20} />
          </Button>
          <Avatar name="VulpoTheDev" src="/img/hero/vulpo.jpg" />
          {/* Signed out */}
          <Button>Sign in</Button>
        </div>
      </nav>
    </>
  )
}
