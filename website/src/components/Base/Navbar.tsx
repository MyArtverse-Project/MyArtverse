"use client"

import { useContext } from "react"
import Link from "next/link"

import {
  MenuIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon,
  MoreVerticalIcon,
  CatIcon
} from "lucide-react"
import {
  Avatar,
  Button,
  Dropdown,
  DropdownButton,
  MenuItem,
  Notifications,
  Separator
} from "../ui"
import { NavbarContext } from "@/contexts"
import Logo from "../Logo"

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
        <Dropdown
          id="add-item"
          buttonChild={
            <DropdownButton
              iconOnly
              variant="secondary"
              aria-label="Add or create item"
              suffixIcon={<ChevronDown size={18} />}
            >
              <PlusIcon size={20} />
            </DropdownButton>
          }
        >
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="New character"
            href="/"
          />
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="Upload photo(s)"
            href="/"
          />
          <Separator dir="horizontal" padding={8} />
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="New collection"
            href="/"
          />
          <MenuItem
            prefix={<CatIcon size={20} />}
            name="New private note"
            href="/"
          />
        </Dropdown>
        <Notifications />
        <Dropdown
          right
          id="avatar"
          buttonChild={
            <DropdownButton className="p-0 rounded-full">
              <Avatar username="VulpoTheDev" src="/img/hero/vulpo.jpg" />
            </DropdownButton>
          }
        >
          <MenuItem prefix={<CatIcon size={20} />} name="1" href="/" />
          <MenuItem prefix={<CatIcon size={20} />} name="3" href="/" />
          <MenuItem prefix={<CatIcon size={20} />} name="5" href="/" />
        </Dropdown>
        {/* Signed out */}
        <Dropdown
          right
          id="site-options"
          buttonChild={
            <DropdownButton
              iconOnly
              variant="secondary"
              aria-label="Site options"
            >
              <MoreVerticalIcon size={20} />
            </DropdownButton>
          }
        >
          lol
        </Dropdown>
        <Button>Sign in</Button>
      </div>
    </nav>
  )
}
