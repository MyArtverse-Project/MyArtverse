"use client"

import { Fragment } from "react"
import { dashboardSidebarToggle } from "@/atoms"
import { ItemIterator } from "@/components/ui"
import clsx from "clsx"
import { useAtom } from "jotai"
import {
  LuBrush,
  LuCat,
  LuHelpCircle,
  LuImage,
  LuKanbanSquare,
  LuLayoutDashboard,
  LuLineChart,
  LuMessagesSquare,
  LuPencil,
  LuSettings,
  LuSparkles
} from "react-icons/lu"
import { Button } from "../Buttons"
import MFImage from "../MFImage"

export default function DashboardSidebar() {
  const [isToggled] = useAtom(dashboardSidebarToggle)

  const menuItems = {
    top: [
      { icon: LuLayoutDashboard, text: "Overview" },
      { icon: LuCat, text: "Characters" },
      { icon: LuBrush, text: "Listings" },
      { icon: LuMessagesSquare, text: "Messages" },
      { icon: LuKanbanSquare, text: "Queue board" },
      { icon: LuImage, text: "Gallery" },
      { icon: LuLineChart, text: "Analytics" }
    ],
    bottom: [
      { icon: LuSparkles, text: "Upgrade" },
      { icon: LuSettings, text: "Settings" },
      { icon: LuHelpCircle, text: "Help" }
    ]
  }

  return (
    <div
      style={{ width: isToggled ? 290 : 85 }}
      className="border-r-mute sticky top-16 h-[calc(100dvh-4.15rem)] flex-shrink-0 overflow-hidden border-r transition-[width] duration-[420ms] ease-in-out [align-self:flex-start]"
      aria-expanded={isToggled ? "true" : undefined}
    >
      <nav className="flex h-full flex-col justify-between px-3.5 py-3.5">
        <div>
          {/* Profile card */}
          <div
            className={clsx(
              "font-inter flex items-center gap-x-2.5 gap-y-3.5 overflow-hidden rounded-md bg-opacity-75 transition-[margin,padding,background-color] duration-[420ms] ease-in-out",
              isToggled ? "bg-300 mb-3 px-4 py-2.5" : "hover:bg-300 mb-0 px-3.5 py-1"
            )}
          >
            <span
              className={clsx(
                "flex-shrink-0 transition-[width] duration-[420ms] ease-in-out",
                isToggled ? "w-10" : "w-8"
              )}
            >
              <MFImage
                src="/img/examples/kuro/kuro-example4.png"
                aspectRatio="1"
                width="100%"
                height="100%"
                rounded={999}
              />
            </span>
            <span className="flex w-full flex-col">
              <span className="-mb-0.5 text-lg font-bold">Name</span>
              <span className="text-subtext text-xs">@Handle</span>
            </span>
            <span className="flex-shrink-0">
              <Button iconOnly variant="tritery" size="small">
                <LuPencil size={18} />
              </Button>
            </span>
          </div>
          {/* Profile card end */}
          <ItemIterator as={Fragment} baseUrl="/dashboard/" items={menuItems.top} />
        </div>
        <ItemIterator items={menuItems.bottom} />
      </nav>
    </div>
  )
}
