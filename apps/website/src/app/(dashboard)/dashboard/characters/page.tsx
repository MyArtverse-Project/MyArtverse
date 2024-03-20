import type { Metadata } from "next"
import CharacterView from "./CharacterView"

export const metadata: Metadata = {
  title: "Characters"
}

export default function CharacterPage() {
  return <CharacterView />
}
