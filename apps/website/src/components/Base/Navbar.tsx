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
  ShareIcon,
  AlbumIcon,
  FileLockIcon
} from "lucide-react"
import { NavbarContext } from "@/context/NavbarContext"

import Logo from "../Logo"
import { Avatar, Button } from "../ui/Buttons"
import Separator from "../ui/Separator"
import { Dropdown, DropdownItem } from "../ui/Dropdown"
import NotificationPopup from "../ui/NotificationPopup"
import { toLower } from "lodash"

export default function Navbar() {
  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)
  // TODO: Implement User Data onto sidebar

  const USER_PLACEHOLDER = "VulpoTheDev"
  const HANDLE_PLACEHOLDER = `@${toLower(USER_PLACEHOLDER)}`

  const createNewItems = [
    { icon: CatIcon, name: "New fursona", link: "/" },
    { icon: ShareIcon, name: "Upload image(s)", link: "/" },
    // TODO: Invoke a modal event here (i.e. "event: () => openModal(newCollectionModal)")
    { icon: AlbumIcon, name: "New collection", link: "/" },
    { icon: FileLockIcon, name: "New private note", link: "/" }
  ]

  return (
    <nav className="flex items-center justify-between px-5 py-4 text-sm font-medium bg-opacity-50 select-none font-inter bg-100">
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
            <Logo size={0.75} />
          </div>
          <div className="mobile-only-lg">
            <Logo logoOnly />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-x-2.5">
        <div className="desktop-only-md">
          <Button
            className="flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-button-idle-chips hover:border-dropdowns-text-field border:border-dropdowns-text-field"
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
                return (
                  <DropdownItem
                    prefix={<item.icon size={20} />}
                    key={index}
                    link={item.link}
                  >
                    {item.name}
                  </DropdownItem>
                )
              })}
            </>
          }
        />
        <NotificationPopup />
        <Dropdown
          button={
            <Button className="grid p-0 border-none rounded-full place-items-center">
              <Avatar username={USER_PLACEHOLDER} src="/img/examples/ozzy/5.png" />
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
        <Button href="/auth/signin">Sign in</Button>
      </div>
    </nav>
  )
}
