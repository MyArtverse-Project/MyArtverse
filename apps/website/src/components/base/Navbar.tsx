"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "@headlessui/react"
import { Fragment } from "react"
import { useSidebarContext } from "@/context"
import { toLower } from "lodash"
import type { IconType } from "react-icons"
import { FaBell } from "react-icons/fa6"
import {
  LuAccessibility as AccessibilityIcon,
  LuAlbum as AlbumIcon,
  LuCat as CatIcon,
  LuContrast as ContrastIcon,
  LuFileLock as FileLockIcon,
  LuHelpCircle as HelpCircleIcon,
  LuLanguages as LanguagesIcon,
  LuBell,
  LuMenu as MenuIcon,
  LuMessageSquarePlus as MessageSquarePlusIcon,
  LuMoreVertical as MoreVerticalIcon,
  LuShare as ShareIcon
} from "react-icons/lu"
import { RiBellLine, RiNotificationLine } from "react-icons/ri"
import { UserType } from "@/types/users"
import { MyFursonaIcon } from "../icons"
import { Separator } from "../ui"
import { Button, SearchButton } from "../ui/Buttons"
import { Dropdown } from "../ui/Dropdown"
import NavbarProfilePeek from "./NavbarProfilePeek"

type ItemIterator = Array<{
  icon?: IconType
  name?: string
  link?: string
  event?: boolean
}>

export default function Navbar({ user }: { user?: UserType }) {
  const { sidebarState: isSidebarOpen, setSidebarState } = useSidebarContext()

  if (user) {
    // TODO: Implement User Data onto sidebar
    const USER_PLACEHOLDER = "VulpoTheDev"
    const HANDLE_PLACEHOLDER = `@${toLower(USER_PLACEHOLDER)}`
  }

  const createNewItems: ItemIterator = [
    { icon: CatIcon, name: "New fursona", link: "/" },
    { icon: ShareIcon, name: "Upload image(s)", link: "/" },
    { icon: AlbumIcon, name: "New collection", link: "/" },
    { icon: FileLockIcon, name: "New private note", link: "/" }
  ]

  const siteSettingsItems: ItemIterator = [
    { icon: ContrastIcon, name: "Change theme" },
    { icon: LanguagesIcon, name: "Language" },
    { icon: ContrastIcon, name: "Filter content settings" },
    { icon: AccessibilityIcon, name: "Accessibility" },
    {},
    { icon: HelpCircleIcon, name: "Help" },
    { icon: MessageSquarePlusIcon, name: "Send feedback" }
  ]

  const pathname = usePathname()
  const disableSidebar = pathname == "/login" || pathname == "/register"

  return (
    <nav className="font-inter bg-100 relative flex select-none items-center justify-between px-5 py-3 text-sm font-medium">
      {/* Navbar left side */}
      <div className="flex h-5 items-center gap-x-3">
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
        <div className="desktop-only-lg">
          <NavbarProfilePeek />
        </div>
        <div className="mobile-only-lg">
          <Link href="/" aria-label="Home" title="Home">
            <MyFursonaIcon logoOnly />
          </Link>
        </div>
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
        {!user ? (
          <div>
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
        ) : (
          <div>
            <Dropdown
              button={
                <Button iconOnly variant="secondary" aria-label="Site options">
                  <MoreVerticalIcon size={20} />
                </Button>
              }
              items={
                <>
                  {createNewItems.map((item, index) => (
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
          </div>
        )}
        <LuBell size={20} />
        {/* Avatar */}
        <img
          src={user.avatarUrl || "/img/default_banner.jpg"}
          className="h-8 w-8 rounded-full"
        />
      </div>
    </nav>
  )
}
