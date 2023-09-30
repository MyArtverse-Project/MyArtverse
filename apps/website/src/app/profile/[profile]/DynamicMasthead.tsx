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
      characterCreator="@ozzydevs"
      characterName="Ozzy"
      characterOwner="@ozzydevs"
      characterPronouns="He/Him"
      characterSpecies="Otter"
      characterToyhouseLink="toyhouse"
      handle={handle}
      status="Owned"
    />
  )
}
