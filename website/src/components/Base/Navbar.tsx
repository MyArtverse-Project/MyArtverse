"use client"

import { useContext } from "react"
import Link from "next/link"

import {
  MenuIcon,
  BellIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon,
  MoreVerticalIcon,
  CatIcon
} from "lucide-react"
import { NavbarContext } from "@/contexts"
import { Avatar, Button, MenuDropdown, MenuItem, Separator } from "../ui"
import Logo from "../Logo"
import MenuDropdownButton from "../ui/Menu/MenuDropdownButton"

export default function Navbar() {
  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)

  return (
    <nav className="sticky top-0 flex items-center justify-between px-5 py-4 text-sm font-medium select-none font-inter">
      {/* Skip nav accessibility */}
      <a
        href="#skip-navigation"
        className="z-[999] rounded-2xl bg-white fixed top-3 left-2 px-5 py-1.5 opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
        aria-label="Skip to content"
      >
        Skip to content
      </a>
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
        <Button
          className="flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-red-200 hover:border-red-500 focus:border-red-500"
          prefixIcon={<SearchIcon size={20} />}
        >
          Search
        </Button>
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
        <MenuDropdown
          buttonChild={
            <MenuDropdownButton>
              <Avatar username="VulpoTheDev" src="/img/hero/vulpo.jpg" />
            </MenuDropdownButton>
          }
        >
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="Placeholder"
            href="/"
          />
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="Placeholder"
            href="/"
          />
        </MenuDropdown>
        {/* Signed out */}
        <Button iconOnly variant="secondary" aria-label="Site options">
          <MoreVerticalIcon size={20} />
        </Button>
        <Button>Sign in</Button>
      </div>
    </nav>
  )
}
