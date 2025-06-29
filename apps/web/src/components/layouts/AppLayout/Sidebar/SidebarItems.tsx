import { User } from "@/app/context/AuthContext"
import Avatar from "@/components/Avatar"
import {
  LuAlertTriangle,
  LuBrush,
  LuCat,
  LuHelpCircle,
  LuHistory,
  LuHome,
  LuMessageSquarePlus,
  LuPalette,
  LuSettings,
  LuSparkle
} from "react-icons/lu"

export const fmDuration = {
  duration: 0.2
}

export const SidebarItems = (user: User | null) => {
  const SIDEBAR_ITEMS_SIGNED_OUT = [
    {
      heading: "",
      items: [{ name: "Home", icon: <LuHome size={20} />, href: "/" }]
    },
    {
      heading: "Explore",
      items: [
        {
          name: "Available Adoptables",
          icon: <LuSparkle size={20} />,
          href: "/adoptables"
        },
        {
          name: "Open for Commissions",
          icon: <LuBrush size={20} />,
          href: "/commissions"
        }
        // TODO: 3D Models Coming Soon
        // { name: "3D Models", icon: BoxIcon, href: "/3d-models" }
      ]
    },
    {
      heading: "",
      items: [
        // { name: "Settings",   icon: <SettingsIcon size={20} />, href: "/settings" },
        { name: "Help", icon: <LuHelpCircle size={20} />, href: "/help" },
        {
          name: "Send feedback",
          icon: <LuMessageSquarePlus size={20} />,
          href: "/feedback"
        },
        {
          name: "Report Issue",
          icon: <LuAlertTriangle size={20} />,
          href: "/report"
        }
      ]
    }
  ]

  const SIDEBAR_ITEMS_SIGNED_IN = [
    {
      heading: "",
      items: [{ name: "Home", icon: <LuHome size={20} />, href: "/" }]
    },
    {
      heading: "Activity",
      items: [
        { name: "History", icon: <LuHistory size={20} />, href: "/history" },
        {
          name: "Your Comissions",
          icon: <LuPalette size={20} />,
          href: `/activity/commissions`
        },
        {
          name: "Your Adopts",
          icon: <LuSparkle size={20} />,
          href: `/activity/adoptables`
        }
      ]
    },
    {
      heading: "Your Characters",
      items: user
        ? user.characters.map((character) => ({
            name: character.name,
            icon: character.avatarUrl ? (
              <Avatar src={character.avatarUrl} />
            ) : (
              <LuCat size={20} />
            ),
            href: `/@${user.handle}/${ character.slug}`
          }))
        : []
    },
    {
      heading: "Explore",
      items: [
        {
          name: "Available Adoptables",
          icon: <LuSparkle size={20} />,
          href: "/adoptables"
        },
        {
          name: "Open for Commissions",
          icon: <LuBrush size={20} />,
          href: "/commissions"
        }
        // TODO: 3D Models Coming Soon
        // { name: "3D Models", icon: BoxIcon, href: "/3d-models" }
      ]
    },
    {
      heading: "",
      items: [
        {
          name: "Settings",
          icon: <LuSettings size={20} />,
          href: "/settings"
        },
        { name: "Help", icon: <LuHelpCircle size={20} />, href: "/help" },
        {
          name: "Send feedback",
          icon: <LuMessageSquarePlus size={20} />,
          href: "/feedback"
        },
        {
          name: "Report Issue",
          icon: <LuAlertTriangle size={20} />,
          href: "/report"
        }
      ]
    }
  ]

  return user ? SIDEBAR_ITEMS_SIGNED_IN : SIDEBAR_ITEMS_SIGNED_OUT
}
