"use client"

import { Fragment } from "react"
import { ItemIterator } from "@/components/ui"
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
    <aside
      style={{ width: 375 }}
      className="border-r-mute sticky top-16 h-[calc(100dvh-4.15rem)] border-r [align-self:flex-start]"
    >
      <nav className="flex h-full flex-col justify-between px-3.5 py-3.5">
        <div>
          {/* Profile card */}
          <div className="font-inter bg-200 mb-3 flex items-center gap-x-2.5 gap-y-3.5 rounded-md px-4 py-2.5">
            <span className="w-10 flex-shrink-0">
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
    </aside>
  )
}
