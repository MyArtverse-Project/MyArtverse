"use client"

import { usePathname } from "next/navigation"
import type { UserType } from "@/types/users"
import CharacterMasthead from "./CharacterMasthead"
import ProfileMasthead from "./ProfileMasthead"

export default function DynamicMasthead({
  profile,
  character
}: {
  profile?: UserType
  character?: string
}) {
  const path = usePathname()
  const isRouteCharacter = path.includes("character/")
  const containsArtUrl = path.includes("/art/")
  if (containsArtUrl) return null

  return !isRouteCharacter ? (
    <ProfileMasthead profileData={profile} />
  ) : (
    <CharacterMasthead
      creator="@ozzydevs"
      name="Ozzy"
      character={character}
      owner="@ozzydevs"
      pronouns="He/Him"
      species="Otter"
      toyhouseLink="toyhouse"
      handle={profile.handle}
      status="Owned"
    />
  )
}
