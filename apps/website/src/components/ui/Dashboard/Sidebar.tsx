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
import { UserType } from "@/types/users"

export default function DashboardSidebar({ userData }: { userData: UserType }) {
  const [isToggled] = useAtom(dashboardSidebarToggle)

  const menuItems = {
    top: [
      { icon: LuLayoutDashboard, text: "Overview" },
      {
        icon: LuCat,
        text: "Characters",
        matchStartingRoute: true
      },
      { icon: LuImage, text: "Gallery" },
      { icon: LuBrush, text: "Listings" },
      { icon: LuMessagesSquare, text: "Messages" },
      { icon: LuKanbanSquare, text: "Queue board" },
      { icon: LuLineChart, text: "Analytics" }
    ],
    bottom: [
      { icon: LuSparkles, text: "Upgrade", link: "/plus" },
      {
        icon: LuSettings,
        text: "Settings",
        link: "/settings/account"
      },
      { icon: LuHelpCircle, text: "Help", link: "/support" }
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
          <SidebarProfile userData={userData} />
          <ItemIterator as={Fragment} baseUrl="/dashboard/" items={menuItems.top} />
        </div>
        <ItemIterator items={menuItems.bottom} />
      </nav>
    </div>
  )
}
