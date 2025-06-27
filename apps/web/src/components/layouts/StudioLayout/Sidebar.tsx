"use client"

import { Button } from "@mav/ui/components/buttons"
import { motion } from "framer-motion"
import { LuSettings } from "react-icons/lu"
import { useSidebarOpenAtom } from "./Sidebar.atom"
import SidebarItem from "./SidebarItem"
import { generateSidebarItems } from "./SidebarItems"

export default function Sidebar() {
  const { sidebarState: isSidebarExpanded } = useSidebarOpenAtom()
  const sidebarItems = generateSidebarItems()

  return (
    <>
      <motion.aside
        data-mav-studio-sidebar=""
        data-expanded={isSidebarExpanded}
        className="border-r-mute bg-100 z-[2] h-full flex-shrink-0 overflow-hidden border-r"
        initial={{ width: 300 }}
        animate={{ width: isSidebarExpanded ? 300 : 80 }}
      >
        <div
          data-mav-list-renderer=""
          className="flex h-full flex-col px-2 py-1.5 gap-2"
        >
          <div className="flex flex-col flex-1">
            {Object.entries(sidebarItems)
              .filter(([sectionKey]) => sectionKey !== "settings")
              .map(([sectionKey, items]) => (
                <div key={sectionKey} className="flex flex-col">
                  {isSidebarExpanded && items.length > 0 && (
                    <span className="m-3 text-sm capitalize">
                      {sectionKey}
                    </span>
                  )}
                  {items.map((item) => (
                    <SidebarItem
                      key={item.label}
                      icon={item.icon}
                      label={item.label}
                      href={item.href}
                      isSidebarExpanded={isSidebarExpanded}
                    />
                  ))}
                </div>
              ))}
          </div>
          <div>
            {sidebarItems.settings && sidebarItems.settings.length > 0 && (
              <div className="flex flex-col">
                {sidebarItems.settings.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isSidebarExpanded={isSidebarExpanded}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.aside>
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
