import {
  LuAccessibility,
  LuAlbum,
  LuBrush,
  LuCat,
  LuCog,
  LuFileLock,
  LuHeart,
  LuHelpCircle,
  LuLayoutDashboard,
  LuLogOut,
  LuMessageSquarePlus,
  LuMinusCircle,
  LuShare,
  LuSun,
  LuUser
} from "react-icons/lu"

export const generateSiteSettingItems = (isRegistered, handle) => {
  return [
    { icon: LuUser, name: "Your Profile", link: `/@${isRegistered ? handle : "null"}` },
    { icon: LuLayoutDashboard, name: "Dashboard", link: `/dashboard` },
    {},
    {
      icon: LuCat,
      name: "Your Characters",
      link: `/@${isRegistered ? handle : "null"}/characters`
    },
    {
      icon: LuHeart,
      name: "Your Favorites",
      link: `/@${isRegistered ? handle : "null"}/favorites`
    },
    { icon: LuCog, name: "Settings", link: "/settings" },
    {},
    // TODO: Implement Ability to toggle Theme and NSFW Settings
    { icon: LuSun, name: "Theme", link: "/settings" },
    { icon: LuMinusCircle, name: "Toggle NSFW", link: "/settings" },
    {},
    { icon: LuAccessibility, name: "Accessibility", link: "/settings" },
    { icon: LuHelpCircle, name: "Help", link: "/settings" },
    { icon: LuMessageSquarePlus, name: "Send feedback", link: "/settings" },
    {},
    { icon: LuLogOut, name: "Logout", link: "/logout" }
  ]
}

export const generateCreateItems = () => [
  { icon: LuCat, name: "New Character", link: "/dashboard/characters?createModal=true" },
  { icon: LuBrush, name: "New YCH Listing", link: "/" },
  { icon: LuBrush, name: "New Comission Slot", link: "/" },
  { icon: LuCat, name: "New Adopotable", link: "/" },
  {},
  { icon: LuShare, name: "Upload image(s)", link: "/art/upload" },
  {},
  { icon: LuAlbum, name: "New collection", link: "/" },
  { icon: LuFileLock, name: "New private note", link: "/" }
]
