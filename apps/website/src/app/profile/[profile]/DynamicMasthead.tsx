"use client"

import { usePathname } from "next/navigation"
import ProfileMasthead from "./ProfileMasthead"
import CharacterMasthead from "./CharacterMasthead"

export default function DynamicMasthead({ handle }: { handle?: string }) {
  const isRouteCharacter = usePathname().includes("character/")
  return !isRouteCharacter ? (
    <ProfileMasthead handle={handle} />
  ) : (
    <CharacterMasthead
      creator="@ozzydevs"
      name="Ozzy"
      owner="@ozzydevs"
      pronouns="He/Him"
      species="Otter"
      toyhouseLink="toyhouse"
      handle={handle}
      status="Owned"
    />
  )
}
