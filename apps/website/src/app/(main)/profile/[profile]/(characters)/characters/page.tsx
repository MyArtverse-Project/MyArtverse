import type { Metadata } from "next"
import { MarginClamp } from "@/components/ui"
import { fetchUserCharacters } from "@/utils/api"
import { BRAND } from "@myfursona-internal/config"
import CharacterView from "./CharacterView"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({ params }) {
  const characters = await fetchUserCharacters(params.profile)
  return (
    <MarginClamp>
      <CharacterView handle={params.profile} characters={characters} />
    </MarginClamp>
  )
}
