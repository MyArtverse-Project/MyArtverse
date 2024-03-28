import type { Metadata } from "next"
import { apiWithAuth, fetchSelfCharacters } from "@/utils/api"
import type { Character } from "@/types/characters"
import CharacterView from "./CharacterView"

export const metadata: Metadata = {
  title: "Characters"
}

export default async function CharacterPage() {
  const characters = await fetchSelfCharacters()
  return <CharacterView characters={characters} />
}
