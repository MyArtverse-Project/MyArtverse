import { ReactNode } from "react"
import { LuCat, LuFileQuestion, LuImage, LuKanbanSquare, LuLineChart, LuMessageCircle, LuPaintbrush, LuSettings, LuShield, LuShieldQuestion, LuZap } from "react-icons/lu"

type SidebarItem = {
  icon: ReactNode
  label: string
  href: string
  roles?: string[]
}

type SidebarItemsByCategory = {
  pinned: SidebarItem[]
  general: SidebarItem[]
  artists: SidebarItem[],
  staff: SidebarItem[],
  settings: SidebarItem[]
}

const generateGeneralSidebarItems = (): SidebarItem[] => {
  // TODO: call backend to check message count
  return [
    {
      icon: <LuKanbanSquare size={20} />,
      label: "Overview",
      href: "/studio/overview"
    },
    {
      icon: <LuCat size={20} />,
      label: "Characters",
      href: "/studio/characters"
    },
    {
      icon: <LuImage size={20} />,
      label: "Gallery",
      href: "/studio/gallery"
    },
    {
      icon: <LuMessageCircle size={20} />,
      label: "Messages",
      href: "/studio/messages"
      // TODO: Add Message Count
    }
  ]
}

const generateArtistSidebarItems = (): SidebarItem[] => {
  // TODO: Call backend to see if user is artist
  return [
    {
      icon: <LuPaintbrush size={20} />,
      label: "Listings",
      href: "/studio/listings"
    },
    {
      icon: <LuKanbanSquare size={20} />,
      label: "Boards",
      href: "/studio/boards"
    },
    {
      icon: <LuZap size={20} />,
      label: "Automations",
      href: "/studio/automations"
    },
    {
      icon: <LuLineChart size={20} />,
      label: "Analytics",
      href: "/studio/analytics"
    },
  ]
}

const generateStaffSidebarItems = (): SidebarItem[] => {
  // TODO: Call backend to see if user is staff
  return [
    {
      icon: <LuShield size={20} />,
      label: "Artist Requests",
      href: "/studio/staff/requests"
    },
  ]
}

const generateSettingsSidebarItems = (): SidebarItem[] => {
  return [
    {
      icon: <LuSettings size={20} />,
      label: "Settings",
      href: "/#"
    },
    {
      icon: <LuShieldQuestion size={20} />,
      label: "Help",
      href: "/#"
    }
  ]
}

export const generateSidebarItems = (): SidebarItemsByCategory => {
  return {
    pinned: [],
    general: generateGeneralSidebarItems(),
    artists: generateArtistSidebarItems(),
    staff: generateStaffSidebarItems(),
    settings: generateSettingsSidebarItems()
  }
}