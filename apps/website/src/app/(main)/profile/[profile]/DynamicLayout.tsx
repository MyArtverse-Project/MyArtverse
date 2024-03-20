"use client"

import { usePathname } from "next/navigation"
import { type Character } from "@/types/characters"
import type { UserType } from "@/types/users"
import CharacterMasthead from "./CharacterMasthead"
import ProfileMasthead from "./ProfileMasthead"

export default function DynamicMasthead({
  profile,
  character
}: {
  profile?: UserType
  character?: Partial<Character>
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
