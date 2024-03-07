"use client"

import {
  LuAccessibility,
  LuAlbum,
  LuCat,
  LuContrast,
  LuFileLock,
  LuHelpCircle,
  LuLanguages,
  LuMessageSquarePlus,
  LuMoreVertical,
  LuShare
} from "react-icons/lu"
import { Avatar, Button } from "../ui/Buttons"
import { UserType } from "@/types/users"
import Link from "next/link"

export default function NavbarUserActions({
  isRegistered,
  user
}: {
  isRegistered?: boolean
  user?: UserType
}) {
  const createNewItems = [
    { icon: LuCat, name: "New fursona", link: "/" },
    { icon: LuShare, name: "Upload image(s)", link: "/" },
    { icon: LuAlbum, name: "New collection", link: "/" },
    { icon: LuFileLock, name: "New private note", link: "/" }
  ]

  const siteSettingsItems = [
    { icon: LuContrast, name: "Change theme" },
    { icon: LuLanguages, name: "Language" },
    { icon: LuContrast, name: "Filter content settings" },
    { icon: LuAccessibility, name: "Accessibility" },
    {},
    { icon: LuHelpCircle, name: "Help" },
    { icon: LuMessageSquarePlus, name: "Send feedback" }
  ]

  if (!isRegistered) {
    return (
      <>
        <Button iconOnly variant="secondary" aria-label="Site options">
          <LuMoreVertical size={20} />
        </Button>
        <Button variant="primary" href="/login">
          Sign in
        </Button>
      </>
    )
  }

  return (
    <>
      <Link href={`/profile/${user.handle}`}>
        <Avatar username={user.handle} size={32} src={user.avatarUrl || "/UserProfile.png"} />
      </Link>
    </>
  )
}
