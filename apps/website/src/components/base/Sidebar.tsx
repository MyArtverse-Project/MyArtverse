"use client"

import Link from "next/link"
import { Fragment, useCallback, useEffect } from "react"
import { sidebarToggle } from "@/atoms"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
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
import { MyFursonaIcon } from "../icons"
import { Button } from "../ui/Buttons"
import Menu from "../ui/Menu"
import Overlay from "../ui/Modal/Overlay"
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

  const [open, setOpen] = useAtom(sidebarToggle)

  const toggleSidebar = useCallback(() => setOpen(!open), [setOpen, open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open && e.key === "Escape") toggleSidebar()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, open])

  return (
    <Overlay state={open} toggler={toggleSidebar}>
      <motion.div
        className="bg-context-menu fixed inset-0 right-[unset] flex w-full flex-col ease-out md:w-[325px]"
        initial={{ x: "-100%", display: "none" }}
        animate={
          open
            ? { x: 0, display: "block", transition: { ease: "easeOut", duration: 0.2 } }
            : {
                x: "-100%",
                transition: { ease: "easeIn", duration: 0.2 },
                transitionEnd: { display: "none" }
              }
        }
      >
        <div className="flex w-full items-center gap-x-2.5 px-5 py-4">
          <Button variant="tritery" iconOnly onClick={toggleSidebar}>
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
      </motion.div>
    </Overlay>
  )
}
