"use client"

import { usePathname } from "next/navigation"
import CharacterMasthead from "./CharacterMasthead"
import ProfileMasthead from "./ProfileMasthead"

export default function DynamicMasthead({
  handle,
  character
}: {
  handle?: string
  character?: string
}) {
  const isRouteCharacter = usePathname().includes("character/")
  return !isRouteCharacter ? (
    <ProfileMasthead handle={handle} />
  ) : (
    <CharacterMasthead
      creator="@ozzydevs"
      name="Ozzy"
      character={character}
      owner="@ozzydevs"
      pronouns="He/Him"
      species="Otter"
      toyhouseLink="toyhouse"
      handle={handle}
      status="Owned"
    />
  )
}
