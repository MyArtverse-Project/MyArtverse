"use client"

import { useContext } from "react"
import Link from "next/link"

import {
  MenuIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon,
  MoreVerticalIcon,
  CatIcon,
  BellIcon
} from "lucide-react"
import Logo from "../Logo"
import { NavbarContext } from "./NavbarContext"
import { Avatar, Button } from "../ui/Buttons"
import Separator from "../ui/Separator"

export default function Navbar() {
  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)

  return (
    <nav className="sticky top-0 flex items-center justify-between px-5 py-4 text-sm font-medium select-none font-inter">
      <div className="flex items-center gap-x-2.5">
        <Button
          iconOnly
          variant="secondary"
          onClick={() => setSidebarState(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={20} />
        </Button>
        <Link href="/" aria-label="Home" title="Home">
          <div className="desktop-only-lg">
            <Logo />
          </div>
          <div className="mobile-only-lg">
            <Logo logoOnly />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-x-2.5">
        <div className="desktop-only-md">
          <Button
            className="flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-red-200 hover:border-red-500 focus:border-red-500"
            prefixIcon={<SearchIcon size={20} />}
          >
            Search
          </Button>
        </div>
        <Separator dir="vertical" size="2.125rem" />
        {/* Signed in */}
        <Button
          iconOnly
          variant="secondary"
          aria-label="Add or create item"
          suffixIcon={<ChevronDown size={18} />}
        >
          <PlusIcon size={20} />
        </Button>
        <Button iconOnly variant="secondary" aria-label="Notifications">
          <BellIcon size={20} />
        </Button>
        <Button className="p-0 rounded-full">
          <Avatar username="VulpoTheDev" src="/img/hero/vulpo.jpg" />
        </Button>
        {/* Signed out */}
        <Button iconOnly variant="secondary" aria-label="Site options">
          <MoreVerticalIcon size={20} />
        </Button>
        <Button>Sign in</Button>
      </div>
    </nav>
  )
}
