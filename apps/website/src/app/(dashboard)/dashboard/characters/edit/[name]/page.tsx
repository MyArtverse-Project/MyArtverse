import type { Metadata } from "next"
import EditCharacterView from "../CharacterEdit"

export const metadata: Metadata = {
  title: "Edit <character name>"
}

export default function CharacterEditPage() {
  return <EditCharacterView />
}
