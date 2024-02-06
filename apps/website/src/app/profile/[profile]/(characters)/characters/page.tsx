import { Metadata, ResolvingMetadata } from "next"
import { MarginClamp } from "@/components/ui"
import type { SlugRouteProps } from "@/types"
import CharacterView from "./CharacterView"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's characters`,
    description: `See User's characters and others on MyFursona by creating an account!`
  }
}

export default function Page({ params }: SlugRouteProps) {
  return (
    <MarginClamp>
      <CharacterView />
    </MarginClamp>
  )
}
