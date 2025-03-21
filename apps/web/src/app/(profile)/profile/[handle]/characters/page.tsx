import type { Metadata } from "next"
import { fetchUserCharacters, fetchUserData } from "@/utils/api"
import { BRAND } from "@mav/shared"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import CharacterView from "./CharacterView"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({ params } : { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const characters = await fetchUserCharacters(handle)
  const { folders } = await fetchUserData()
  return (
    <MarginClamp>
      <CharacterView handle={handle} characters={characters} folders={folders} />
    </MarginClamp>
  )
}
