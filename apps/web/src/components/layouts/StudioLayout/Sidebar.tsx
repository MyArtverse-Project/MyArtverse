"use client"

import { Button } from "@mav/ui/components/buttons"
import { motion } from "framer-motion"
import { LuArrowLeft, LuSettings } from "react-icons/lu"
import { useSidebarOpenAtom } from "./Sidebar.atom"

export default function Sidebar() {
  const { sidebarState: isSidebarExpanded } = useSidebarOpenAtom()

  return (
    <>
      <motion.aside
        data-mav-studio-sidebar=""
        data-expanded={isSidebarExpanded}
        // className="border-r-mute bg-100 z-[2] h-full flex-shrink-0 overflow-hidden border-r"
        initial={{ width: 300 }}
        animate={{ width: isSidebarExpanded ? 300 : 80 }}
      >
        <div data-mav-list-renderer="" className="flex h-full flex-col px-2 py-1.5">
          <div className="flex-1">lol</div>
          <div>
            <Button href="/#" variant="tritery" prefix={<LuSettings size={20} />}>
              Settings
            </Button>
          </div>
        </div>
      </motion.aside>
      {/* <div className="absolute inset-0 z-[1] bg-black/10 backdrop-blur-sm" aria-hidden /> */}
    </>
  )
}

export function SidebarFallback() {
  return (
    <div
      className="border-r-mute bg-100 z-[2] h-full flex-shrink-0 border-r"
      style={{ width: 300 }}
    ></div>
  )
}
