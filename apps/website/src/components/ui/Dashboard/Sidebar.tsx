"use client"

import { Fragment } from "react"
import { dashboardSidebarToggle } from "@/atoms"
import { ItemIterator } from "@/components/ui"
import { useAtom } from "jotai"
import type { IconType } from "react-icons"
import {
  LuBrush,
  LuCat,
  LuHelpCircle,
  LuImage,
  LuKanbanSquare,
  LuLayoutDashboard,
  LuLineChart,
  LuMessagesSquare,
  LuSettings,
  LuSparkles
} from "react-icons/lu"
import SidebarProfile from "./SidebarProfile"

interface DashboardMenuItems {
  [x: string]: {
    icon: IconType
    text: string
    /** Check for any sub routes to make sure the root item still stays active */
    checkRoutes?: `/${string}`[]
  }[]
}

export default function DashboardSidebar() {
  const [isToggled] = useAtom(dashboardSidebarToggle)

  const menuItems: DashboardMenuItems = {
    top: [
      { icon: LuLayoutDashboard, text: "Overview" },
      {
        icon: LuCat,
        text: "Characters",
        // TODO implement this logic to checkroutes with these with startswith()
        checkRoutes: ["/characters", "/characters/refsheets"]
      },
      { icon: LuImage, text: "Gallery" },
      { icon: LuBrush, text: "Listings" },
      { icon: LuMessagesSquare, text: "Messages" },
      { icon: LuKanbanSquare, text: "Queue board" },
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
          <SidebarProfile />
          <ItemIterator as={Fragment} baseUrl="/dashboard/" items={menuItems.top} />
        </div>
        <ItemIterator items={menuItems.bottom} />
      </nav>
    </div>
  )
}
