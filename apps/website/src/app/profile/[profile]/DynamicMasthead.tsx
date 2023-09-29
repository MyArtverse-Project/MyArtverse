"use client"

import { usePathname } from "next/navigation"
import ProfileMasthead from "./ProfileMasthead"

export default function DynamicMasthead({ handle }: { handle?: string }) {
  const isRouteCharacter = usePathname().includes("character/")
  return !isRouteCharacter ? (
    <ProfileMasthead handle={handle} />
  ) : (
    "fursona masthead"
  )
}
