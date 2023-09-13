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
  FileLockIcon,
  ContrastIcon,
  LucideIcon
} from "lucide-react"

import { toLower } from "lodash-es"
import { Menu } from "@headlessui/react"
import { SidebarContext } from "@/context/NavbarProvider"
import { MyFursona } from "../icons"
import { Button } from "../ui/Buttons"
import { Separator } from "../ui"
import { Dropdown } from "../ui/Dropdown"

type ItemIterator = Array<{
  icon?: LucideIcon
  name?: string
  link?: string
  event?: boolean
}>

export default function Navbar() {
  const { sidebarState: isSidebarOpen, setSidebarState } =
    useContext(SidebarContext)
  // TODO: Implement User Data onto sidebar

  const USER_PLACEHOLDER = "VulpoTheDev"
  const HANDLE_PLACEHOLDER = `@${toLower(USER_PLACEHOLDER)}`

  // TODO: Invoke a modal event here (i.e. "event: () => openModal(newCollectionModal)")
  const createNewItems: ItemIterator = [
    { icon: CatIcon, name: "New fursona", link: "/" },
    { icon: ShareIcon, name: "Upload image(s)", link: "/" },
    { icon: AlbumIcon, name: "New collection", link: "/" },
    { icon: FileLockIcon, name: "New private note", link: "/" }
  ]

  const siteSettingsItems: ItemIterator = [
    { icon: ContrastIcon, name: "Change theme" },
    { icon: ContrastIcon, name: "Language" },
    { icon: ContrastIcon, name: "Filter content settings" },
    {},
    { icon: ContrastIcon, name: "Help" },
    {},
    { icon: ContrastIcon, name: "Send feedback" }
  ]

  return (
    <nav className="z-[15] relative flex items-center justify-between px-5 py-3 text-sm font-medium select-none font-inter bg-100">
      <div className="flex items-center gap-x-3">
        <Button
          iconOnly
          variant="tritery"
          onClick={() => setSidebarState(!isSidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon size={20} />
        </Button>
        <Link href="/" aria-label="Home" title="Home">
          <div className="desktop-only-lg">
            <MyFursona size={0.75} />
          </div>
          <div className="mobile-only-lg">
            <MyFursona logoOnly />
          </div>
        </Link>
      </div>
      {/* Navbar right side */}
      <div className="flex items-center gap-x-2.5">
        <div className="desktop-only-md">
          <Button
            className="rounded-md flex items-center gap-x-1.5 pl-3 pr-24 lg:pr-32 xl:pr-48 py-2 border border-button-idle-chips hover:border-dropdowns-text-field border:border-dropdowns-text-field"
            prefixIcon={<SearchIcon size={20} />}
          >
            Search
          </Button>
        </div>
        <Separator dir="vertical" size="2.125rem" />
        {/* Signed in */}
        {/* <Dropdown
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
        /> */}
        {/* Signed out */}
        <Dropdown
          button={
            <Button iconOnly variant="secondary" aria-label="Site options">
              <MoreVerticalIcon size={20} />
            </Button>
          }
          items={
            <>
              {siteSettingsItems.map((item, index) => (
                <React.Fragment key={index}>
                  {typeof item.name !== "undefined" ? (
                    <Menu.Item>
                      <Button
                        prefixIcon={<item.icon size={20} />}
                        variant="tritery"
                        style={{ width: "100%" }}
                      >
                        {item.name}
                      </Button>
                    </Menu.Item>
                  ) : (
                    <Separator dir="horizontal" padding={6.5} />
                  )}
                </React.Fragment>
              ))}
            </>
          }
        />
        <Button href="/login">Sign in</Button>
      </div>
    </nav>
  )
}
