import type { Metadata } from "next"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { DefineRouteParams } from "@/types"
import { fetchUser, fetchUserCharacters, fetchUserData } from "@/utils/api"
import { BRAND } from "@mav/shared"
import CharacterView from "./CharacterView"

type AsyncProps = DefineRouteParams<{ handle: string }>

export async function generateMetadata(): Promise<Metadata> {
  // TODO add a simple check if their name ends with an "s"; for example "Dennis"
  // TODO it should display: "Dennis' characters", etc
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`,
  }
}

export default async function Page({ params }: AsyncProps) {
  const { handle } = await params
  const characters = await fetchUserCharacters(handle)
  const { folders, id } = await fetchUser(handle)
  const self = await fetchUserData()
  return (
    <MarginClamp>
      <CharacterView
        handle={handle}
        characters={characters}
        folders={folders}
        owner={self.id === id}
      />
    </MarginClamp>
  )
}
