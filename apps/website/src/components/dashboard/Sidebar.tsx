"use client"

/* eslint-disable import/no-internal-modules */
import { Fragment } from "react"
import { sidebarToggleDashboard } from "@/atoms"
import { ItemIterator, MFImage, Separator } from "@/components/ui"
import { usePathStartsWith } from "@/hooks"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { useAtomValue } from "jotai"
import {
  LuArrowLeft,
  LuBrush,
  LuCat,
  LuHelpCircle,
  LuImage,
  LuKanbanSquare,
  LuLayoutDashboard,
  LuLineChart,
  LuMessagesSquare,
  LuSettings,
  LuShield,
  LuSparkles
} from "react-icons/lu"
import { Button } from "../ui/Buttons"
import type { ItemIteratorType } from "../ui/Layouts/ItemIterator"
import SidebarProfile from "./SidebarProfile"

export default function DashboardSidebar() {
  // TODO check for localStorage to persist state of collapse/expand sidebar
  const toggleState = useAtomValue(sidebarToggleDashboard)

  const menuItems: {
    top: ItemIteratorType[]
    bottom: ItemIteratorType[]
  } = {
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
      { icon: LuLineChart, text: "Analytics" },
      { icon: LuShield, text: "Artist Requests", link: "/admin/artist-requests" }
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

  const editCharacterRoute = usePathStartsWith("/dashboard/characters/edit")

  const fmTransition = { ease: "circInOut", duration: 0.275 }

  return (
    <span aria-expanded={toggleState ? "true" : undefined}>
      <LazyMotion features={domAnimation}>
        <m.nav
          animate={{ width: toggleState ? 290 : 85 }}
          className="border-r-mute sticky top-16 h-[calc(100dvh-4.15rem)] flex-shrink-0 overflow-hidden border-r"
        >
          {/* Main navigation */}
          <m.div
            id="main-nav"
            initial={{ x: "0%" }}
            animate={{
              x: !editCharacterRoute ? "0%" : "-25%",
              pointerEvents: !editCharacterRoute ? "auto" : "none"
            }}
            transition={fmTransition}
            className="relative flex h-full flex-col justify-between px-3.5 py-3.5"
          >
            <div>
              <SidebarProfile />
              <ItemIterator as={Fragment} baseUrl="/dashboard/" items={menuItems.top} />
            </div>
            <ItemIterator items={menuItems.bottom} />
          </m.div>

          {/* Show if character/listing edit or user msg route is present */}
          <m.div
            initial={{ x: "100%" }}
            animate={{
              x: !editCharacterRoute ? "100%" : "0%",
              pointerEvents: !editCharacterRoute ? "none" : "auto"
            }}
            transition={fmTransition}
            className="bg-100 relative -top-full bottom-0 flex h-full flex-col px-3.5 py-3.5"
          >
            <div>
              {/* TODO: This is temporary; will be using url checks to populate data without using a shit ton of divs */}
              <Button
                href="/dashboard/characters"
                prefixIcon={<LuArrowLeft size={19} />}
                variant="tritery"
              >
                Back
              </Button>
              <div className="my-2">
                <Separator dir="horizontal" />
              </div>
              <Button
                prefixIcon={
                  <MFImage
                    src="/img/examples/ozzy/testing.png"
                    aspectRatio="1"
                    alt=""
                    rounded={50}
                    objectFit="cover"
                    width="1.75rem"
                  />
                }
                variant="tritery"
                className="bg-500 text-active w-full gap-x-2.5 py-1.5"
              >
                Name
              </Button>
              {[...Array(3)].map((_, i) => (
                <Button
                  key={i}
                  prefixIcon={
                    <MFImage
                      src="/img/examples/ozzy/testing.png"
                      aspectRatio="1"
                      alt=""
                      rounded={50}
                      objectFit="cover"
                      width="1.75rem"
                    />
                  }
                  variant="tritery"
                  className="w-full gap-x-2.5 py-1.5"
                >
                  Name
                </Button>
              ))}
            </div>
          </m.div>
        </m.nav>
      </LazyMotion>
    </span>
  )
}
