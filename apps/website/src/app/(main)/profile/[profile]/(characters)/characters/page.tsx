import type { Metadata } from "next"
import { MarginClamp } from "@/components/ui"
import { BRAND } from "@myfursona-internal/config"
import CharacterView from "./CharacterView"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on ${BRAND} by creating an account!`
  }
}

export default function Page() {
  return (
    <MarginClamp>
      <CharacterView />
    </MarginClamp>
  )
}
