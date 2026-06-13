"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { LuSettings } from "react-icons/lu"
import { useSidebarOpenAtom } from "./Sidebar.atom"

export default function Sidebar() {
  const { sidebarState: isSidebarExpanded } = useSidebarOpenAtom()

  return (
    <>
      <motion.aside
        data-mav-studio-sidebar=""
        data-expanded={isSidebarExpanded}
        initial={{ width: 300 }}
        animate={{ width: isSidebarExpanded ? 300 : 80 }}
      >
        <div
          data-mav-list-renderer=""
          className="flex h-full flex-col px-2 py-1.5"
        >
          <div className="flex-1">lol</div>
          <div>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Link href="/#">
                <LuSettings size={20} />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export function SidebarFallback() {
  return (
    <div
      className="border-border bg-background z-[2] h-full flex-shrink-0 border-r"
      style={{ width: 300 }}
    ></div>
  )
}
