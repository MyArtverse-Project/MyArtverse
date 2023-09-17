"use client"

import { Fragment, useContext } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MenuIcon,
  MoreVerticalIcon,
  CatIcon,
  ShareIcon,
  AlbumIcon,
  FileLockIcon,
  ContrastIcon,
  LucideIcon
} from "lucide-react"
import { toLower } from "lodash"
import { Menu } from "@headlessui/react"
import { SidebarContext } from "@/context/NavbarProvider"
import { MyFursona } from "../icons"
import { Button, SearchButton } from "../ui/Buttons"
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

  const pathname = usePathname()
  const disableSidebar = pathname == "/login" || pathname == "/register"

  return (
    <nav className="z-[15] relative flex items-center justify-between px-5 py-3 text-sm font-medium select-none font-inter bg-100">
      {/* Navbar left side */}
      <div className="flex items-center gap-x-3">
        {!disableSidebar ? (
          <Button
            iconOnly
            variant="tritery"
            onClick={() => setSidebarState(!isSidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <MenuIcon size={20} />
          </Button>
        ) : null}
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
        {!disableSidebar ? (
          <>
            <div className="desktop-only-md">
              <SearchButton />
            </div>
            <Separator dir="vertical" size="2.125rem" />
          </>
        ) : null}
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
                <Fragment key={index}>
                  {typeof item.name !== "undefined" ? (
                    <Menu.Item>
                      <Button
                        position="left"
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
                </Fragment>
              ))}
            </>
          }
        />
        <Button href="/login">Sign in</Button>
      </div>
    </nav>
  )
}
