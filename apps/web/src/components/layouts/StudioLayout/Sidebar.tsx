"use client"

import { Button } from "@mav/ui/components/buttons"
import { motion } from "framer-motion"
import { LuArrowLeft, LuSettings } from "react-icons/lu"
import { useSidebarOpenAtom } from "./Sidebar.atom"
import SidebarItem from "./SidebarItem"
import { generateEditSidebarItems, generateSidebarItems } from "./SidebarItems"
import { useAuth, User } from "@/app/context/AuthContext"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import Avatar from "@/components/Avatar"
import clsx from 'clsx'
import { SelectField } from "../Forms"

export default function Sidebar({ user }: { user: User }) {
  const { sidebarState: isSidebarExpanded } = useSidebarOpenAtom()
  const pathname = usePathname();
  const isEditingCharacter = pathname.includes('/studio/characters/');
  const characterId = isEditingCharacter
    ? pathname.split("/studio/characters/")[1]?.split("/")[0]
    : null;
  const sidebarItems = characterId ? generateEditSidebarItems(characterId) : generateSidebarItems();

  return (
    <>
      <motion.aside
        data-mav-studio-sidebar=""
        data-expanded={isSidebarExpanded}
        className="border-r-mute bg-200 z-[2] h-full flex-shrink-0 overflow-hidden border-r"
        initial={{ width: 300 }}
        animate={{ width: isSidebarExpanded ? 300 : 80 }}
      >
        <div
          data-mav-list-renderer=""
          className="flex h-full flex-col  py-1.5 gap-2"
        >
          <div className={clsx("flex items-center justify-between", isSidebarExpanded ? "px-3" : "pr-2")}>
            {characterId ? (
              <div className="flex gap-2 w-full flex-col">
                <Button href="/studio/characters" icon={<LuArrowLeft size={20} />}>Back to Characters</Button>
                <SelectField
                  options={user.characters.map(character => ({ value: character.id, label: character.name }))}
                  inputName="Editing"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => window.location.href = `/studio/characters/${e.target.value}`}
                  value={characterId ?? ""}
                />
              </div>
            ) : (
              <div className={clsx("p-3 flex flex-row bg-100 rounded-md", isSidebarExpanded ? "justify-start" : "justify-center")}>
                <Avatar
                  username={user.handle}
                  size={isSidebarExpanded ? 40 : 30}
                  src={user.avatarUrl || "/UserProfile.png"}
                  imageKey={user.id}
                />
                {isSidebarExpanded && (
                  <div className="flex flex-col justify-center ml-2">
                    <span className="text-sm">{user.displayName}</span>
                    <span className="text-sm text-subtext">@{user.handle}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1">
            {Object.entries(sidebarItems)
              .filter(([key]) => key !== "settings")
              .map(([sectionKey, items]) => (
                <div key={sectionKey} className="flex flex-col">
                  {isSidebarExpanded && items.length > 0 && (
                    <span className="m-3 text-sm text-subtext capitalize">
                      {sectionKey === "character" ? "Character Editor" : sectionKey}
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