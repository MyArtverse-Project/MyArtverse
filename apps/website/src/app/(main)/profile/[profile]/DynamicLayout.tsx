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
  const path = usePathname()
  const isRouteCharacter = path.includes("character/")
  const containsArtUrl = path.includes("/art/")

  if (containsArtUrl) return null

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
