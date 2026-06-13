"use client"

import { User } from "@/app/context/AuthContext"
import Separator from "@/components/Separator"
import { Button } from "@/components/ui/button"
import { cn } from "@mav/shared/utils"
import { MyArtverseIcon } from "@/components/icons/MyArtverse"
import { motion } from "framer-motion"
import Link from "next/link"
import { Fragment } from "react"
import { LuX } from "react-icons/lu"
import Menu from "../../Menu"
import { SidebarItems, fmDuration } from "./SidebarItems"

export function Sidebar({
  toggleSidebar,
  sidebarOpened,
  user
}: {
  toggleSidebar: () => void
  sidebarOpened: boolean
  user: User | null
}) {
  const SIDEBAR_ITEMS = SidebarItems(user)
  return (
    <>
      <div
        onClick={toggleSidebar}
        className={cn(
          "fixed inset-0 z-[99] bg-black/60 transition-all duration-[350ms]",
          sidebarOpened ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div className="fixed z-[100]">
        <motion.div
          // @ts-expect-error
          className="bg-popover text-popover-foreground border-border fixed inset-0 right-[unset] flex w-full flex-col border-r ease-out md:w-[325px]"
          initial={{ x: "-100%", display: "none" }}
          animate={
            sidebarOpened
              ? {
                  x: 0,
                  display: "block",
                  transition: { ...fmDuration, ease: "easeOut" }
                }
              : {
                  x: "-100%",
                  transition: { ...fmDuration, ease: "easeIn" },
                  transitionEnd: { display: "none" }
                }
          }
        >
          <div className="flex w-full items-center gap-x-2.5 px-5 py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              aria-label="Close menu"
            >
              <LuX size={20} />
            </Button>
            <Link href="/" aria-label="Home" title="Home">
              <MyArtverseIcon size={0.8} />
            </Link>
          </div>
          <div className="h-full px-2.5" role="menu">
            {SIDEBAR_ITEMS.map(({ heading, items }, index) => (
              <Fragment key={index}>
                <Menu heading={heading ?? undefined}>
                  {items.map((item, index) => (
                    <Menu.Item
                      key={index}
                      name={item.name}
                      prefixIcon={item.icon}
                      href={item.href}
                    />
                  ))}
                </Menu>
                <Separator dir="horizontal" padding="0.525rem" />
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
