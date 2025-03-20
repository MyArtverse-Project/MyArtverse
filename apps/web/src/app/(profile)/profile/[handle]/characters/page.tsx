import type { Metadata } from "next"
import { fetchUserCharacters } from "@/utils/api"
import { BRAND } from "@mav/shared"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import CharacterView from "./CharacterView"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({ params } : { params: { handle: string } }) {
  const characters = await fetchUserCharacters(params.handle)
  return (
    <MarginClamp>
      <CharacterView handle={params.handle} characters={characters} />
    </MarginClamp>
  )
}
