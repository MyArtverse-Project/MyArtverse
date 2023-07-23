"use client"

import React, { useContext } from "react"
import Link from "next/link"

import {
  MenuIcon,
  SearchIcon,
  ChevronDown,
  PlusIcon,
  MoreVerticalIcon,
  CatIcon,
  BellIcon,
  ShareIcon,
  AlbumIcon,
  FileLockIcon
} from "lucide-react"
import { NavbarContext } from "./NavbarContext"

import Logo from "../Logo"
import { Avatar, Button } from "../ui/Buttons"
import Separator from "../ui/Separator"
import { Dropdown, DropdownItem } from "../ui/Dropdown"

export default function Navbar() {
  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)

  const USER_PLACEHOLDER = "VulpoTheDev"
  const HANDLE_PLACEHOLDER = "@vulpothedev"

  const createNewItems = [
    { icon: CatIcon, name: "New fursona", link: "/" },
    { icon: ShareIcon, name: "Upload image(s)", link: "/" },
    { icon: AlbumIcon, name: "New collection", link: "/" },
    { icon: FileLockIcon, name: "New private note", link: "/" }
  ]

  return (
    <nav className="flex items-center justify-between px-5 py-4 text-sm font-medium select-none font-inter">
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
          button={
            <Button
              iconOnly
              variant="secondary"
              aria-label="Add or create item"
              suffixIcon={<ChevronDown size={18} />}
            >
              <PlusIcon size={20} />
            </Button>
          }
          items={
            <>
              {createNewItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <DropdownItem prefix={<Icon size={20} />} key={index}>
                    {item.name}
                  </DropdownItem>
                )
              })}
            </>
          }
        />
        <Button iconOnly variant="secondary" aria-label="Notifications">
          <BellIcon size={20} />
        </Button>
        <Dropdown
          button={
            <Button className="p-0 rounded-full">
              <Avatar username={USER_PLACEHOLDER} src="/img/hero/vulpo.jpg" />
            </Button>
          }
          items={
            <>
              <div className="flex items-center px-4 py-1.5 gap-x-3">
                <Avatar
                  username={USER_PLACEHOLDER}
                  size={69}
                  src="/img/hero/vulpo.jpg"
                />
                <div>
                  <h1 className="text-lg font-bold leading-6">
                    {USER_PLACEHOLDER}
                  </h1>
                  <span className="text-sm opacity-50">
                    {HANDLE_PLACEHOLDER}
                  </span>
                </div>
              </div>
              <Separator dir="horizontal" padding="0.66rem" />
            </>
          }
        />
        {/* Signed out */}
        <Button iconOnly variant="secondary" aria-label="Site options">
          <MoreVerticalIcon size={20} />
        </Button>
        <Button>Sign in</Button>
      </div>
    </nav>
  )
}
