"use client"

import React, { useCallback, useContext, useEffect } from "react"
import Link from "next/link"

import { NavbarContext } from "@/context/NavbarProvider"
import {
  HomeIcon,
  SparklesIcon,
  XIcon,
  BrushIcon,
  SettingsIcon,
  HelpCircleIcon,
  MessageSquarePlusIcon,
  AlertTriangleIcon,
  BoxIcon
} from "lucide-react"
import Logo from "../Logo"
import Overlay from "../ui/Overlay"
import { Button } from "../ui/Buttons"
import { MenuGroup, MenuItem } from "../ui/Menu"
import Separator from "../ui/Separator"

export default function Sidebar() {
  const SIDEBAR_ITEMS = [
    {
      heading: "",
      items: [{ name: "Home", icon: HomeIcon }]
    },
    {
      heading: "Explore",
      items: [
        { name: "Available Adoptables", icon: SparklesIcon },
        { name: "Open for Commissions", icon: BrushIcon },
        { name: "3D Models", icon: BoxIcon }
      ]
    },
    {
      heading: "",
      items: [
        { name: "Settings", icon: SettingsIcon },
        { name: "Help", icon: HelpCircleIcon },
        { name: "Send feedback", icon: MessageSquarePlusIcon },
        { name: "Report Issue", icon: AlertTriangleIcon }
      ]
    }
  ]

  const { isSidebarOpen, setSidebarState } = useContext(NavbarContext)

  const toggleSidebar = useCallback(() => {
    setSidebarState(!isSidebarOpen)
  }, [setSidebarState, isSidebarOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSidebarOpen && e.key === "Escape") {
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [toggleSidebar, isSidebarOpen])

  return (
    <Overlay state={isSidebarOpen} toggler={toggleSidebar}>
      <aside
        className="flex flex-col fixed inset-0 right-[unset] bg-context-menu transition-none md:transition-transform md:duration-300 ease-out w-full md:w-[325px]"
        style={{
          transform: isSidebarOpen
            ? "translate3d(0,0,0)"
            : "translate3d(-100%,0,0)"
        }}
      >
        <div className="w-full px-5 py-4 flex items-center gap-x-2.5">
          <Button variant="secondary" iconOnly onClick={toggleSidebar}>
            <XIcon size={20} />
          </Button>
          <Link href="/" aria-label="Home" title="Home">
            <Logo />
          </Link>
        </div>
        <div className="px-2.5 h-full overflow-y-scroll" role="menu">
          {SIDEBAR_ITEMS.map(({ heading, items }, index) => (
            <React.Fragment key={index}>
              <MenuGroup heading={heading ?? undefined}>
                {items.map((item, index) => (
                  <MenuItem
                    key={index}
                    name={item.name}
                    prefix={<item.icon size={20} />}
                    href="/"
                  />
                ))}
              </MenuGroup>
              <Separator dir="horizontal" padding="0.525rem" />
            </React.Fragment>
          ))}
        </div>
      </aside>
    </Overlay>
  )
}
