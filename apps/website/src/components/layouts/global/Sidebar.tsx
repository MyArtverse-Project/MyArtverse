"use client"

import Link from "next/link"
import { Fragment, useCallback, useEffect } from "react"
import { useSidebarContext } from "@/context"
import {
  LuAlertTriangle as AlertTriangleIcon,
  LuBox as BoxIcon,
  LuBrush as BrushIcon,
  LuHelpCircle as HelpCircleIcon,
  LuHome as HomeIcon,
  LuMessageSquarePlus as MessageSquarePlusIcon,
  LuSettings as SettingsIcon,
  LuSparkles as SparklesIcon,
  LuX as XIcon
} from "react-icons/lu"
import { MyFursonaIcon } from "../../icons"
import { Button } from "../../ui/Buttons"
import Menu from "../../ui/Menu"
import Overlay from "../../ui/Modal/Overlay"
import Separator from "../../ui/Separator"

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

  const { sidebarState: isSidebarOpen, setSidebarState } = useSidebarContext()

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
        className="bg-context-menu fixed inset-0 right-[unset] flex w-full flex-col transition-none ease-out md:w-[325px] md:transition-transform md:duration-300"
        style={{
          transform: isSidebarOpen ? "translate3d(0,0,0)" : "translate3d(-100%,0,0)"
        }}
      >
        <div className="flex w-full items-center gap-x-2.5 px-5 py-4">
          <Button variant="secondary" iconOnly onClick={toggleSidebar}>
            <XIcon size={20} />
          </Button>
          <Link href="/" aria-label="Home" title="Home">
            <MyFursonaIcon />
          </Link>
        </div>
        <div className="h-full overflow-y-scroll px-2.5" role="menu">
          {SIDEBAR_ITEMS.map(({ heading, items }, index) => (
            <Fragment key={index}>
              <Menu heading={heading ?? undefined}>
                {items.map((item, index) => (
                  <Menu.Item
                    key={index}
                    name={item.name}
                    prefix={<item.icon size={20} />}
                    href="/"
                  />
                ))}
              </Menu>
              <Separator dir="horizontal" padding="0.525rem" />
            </Fragment>
          ))}
        </div>
      </aside>
    </Overlay>
  )
}
