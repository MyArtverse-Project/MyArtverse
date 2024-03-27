import type { Metadata } from "next"
import { apiWithAuth } from "@/utils/api"
import type { Character } from "@/types/characters"
import CharacterView from "./CharacterView"

export const metadata: Metadata = {
  title: "Characters"
}

const fetchCharacters = async () => {
  const characters = await apiWithAuth<Character[]>("GET", "/v1/character/")
  return characters
}

export default async function CharacterPage() {
  const characters = await fetchCharacters()
  return <CharacterView characters={characters} />
}
