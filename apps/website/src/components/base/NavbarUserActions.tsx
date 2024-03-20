"use client"

import Link from "next/link"
import {
  LuAccessibility,
  LuAlbum,
  LuCat,
  LuContrast,
  LuFileLock,
  LuHelpCircle,
  LuLanguages,
  LuLogIn,
  LuMessageSquarePlus,
  LuMoreVertical,
  LuShare
} from "react-icons/lu"
import type { UserType } from "@/types/users"
import { Avatar, Button } from "../ui/Buttons"

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
        <Button
          icon={<LuMoreVertical size={20} />}
          variant="secondary"
          aria-label="Site options"
        />
        <Button variant="primary" href="/login" prefixIcon={<LuLogIn size={19} />}>
          Login
        </Button>
      </>
    )
  }

  return (
    <>
      <Link href={`/@${user.handle}` as unknown}>
        <Avatar
          username={user.handle}
          size={32}
          src={user.avatarUrl || "/UserProfile.png"}
        />
      </Link>
    </>
  )
}
