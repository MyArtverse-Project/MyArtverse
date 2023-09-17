"use client"

import { Fragment } from "react"
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
import { useDetailPeekContext, useSidebarContext } from "@/context"
import { MyFursona } from "../icons"
import { Button, SearchButton } from "../ui/Buttons"
import { BuiImage, Separator } from "../ui"
import { Dropdown } from "../ui/Dropdown"
import clsx from "clsx"

type ItemIterator = Array<{
  icon?: LucideIcon
  name?: string
  link?: string
  event?: boolean
}>

export default function Navbar() {
  const { sidebarState: isSidebarOpen, setSidebarState } = useSidebarContext()
  const { type, img: peekImg, username, isPeeking } = useDetailPeekContext()

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
  const handlePeekRoutes =
    pathname.includes("/profile") || pathname.includes("/character")

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
        <div className="desktop-only-lg">
          {/* TODO wrap this as a component */}
          <div id="profile-peek" className="relative flex items-center">
            <Link href="/" aria-label="Home" title="Home">
              <MyFursona logoOnly size={0.7} />
            </Link>
            <div
              className={clsx(
                "absolute top-0 transition-[opacity,transform] duration-300",
                handlePeekRoutes
                  ? isPeeking
                    ? "translate-x-0 opacity-100"
                    : "-translate-y-9 opacity-0 pointer-events-none"
                  : "translate-x-0 opacity-100"
              )}
            >
              <Link href="/" aria-label="Home" title="Home">
                <MyFursona wordmarkOnly size={0.7} />
              </Link>
            </div>
            <div
              id="handle-wrapper"
              className={clsx(
                "ml-3.5 text-lg flex gap-x-2 items-center transition-[opacity,transform] duration-300",
                handlePeekRoutes
                  ? isPeeking
                    ? "translate-y-9 opacity-0 pointer-events-none"
                    : "translate-x-0 opacity-100"
                  : "translate-y-9 opacity-0 pointer-events-none"
              )}
            >
              {peekImg ? (
                <>
                  <span className="opacity-50">&#47;</span>
                  <BuiImage
                    src={peekImg}
                    height={30}
                    width={30}
                    objectFit="cover"
                    aspectRatio="1/1"
                    rounded
                    strategy="important"
                  />
                  <span className="font-inter text-sm">{`@${username}`}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mobile-only-lg">
          <Link href="/" aria-label="Home" title="Home">
            <MyFursona logoOnly />
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
