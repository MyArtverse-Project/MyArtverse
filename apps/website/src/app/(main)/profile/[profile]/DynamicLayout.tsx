"use client"

import { usePathname } from "next/navigation"
import type { UserType } from "@/types/users"
import CharacterMasthead from "./CharacterMasthead"
import ProfileMasthead from "./ProfileMasthead"
import { Character, CharacterResponse } from "@/types/characters"

export default function DynamicMasthead({
  profile,
  character
}: {
  profile?: UserType
  character?: Character
}) {
  const path = usePathname()
  const isRouteCharacter = path.includes("character/")
  const containsArtUrl = path.includes("/art/")
  if (containsArtUrl) return null

  return !isRouteCharacter ? (
    <ProfileMasthead profileData={profile} />
  ) : (
    <CharacterMasthead
      creator={profile.displayName}
      name={character.name}
      owner={profile.displayName}
      pronouns={"TODO"}
      species={character.species}
      toyhouseLink={"TODO"}
      handle={"TODO"}
      status="Owned"
    />
  )
}
