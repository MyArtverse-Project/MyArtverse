import type { Metadata, ResolvingMetadata } from "next"
import { MarginClamp } from "@/components/ui"
import type { SlugRouteProps } from "@/types/utils"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Favorites`,
    description: `See User's favorites and more on MyFursona by creating an account!`
  }
}

export default function FavoritesPage({ params }: SlugRouteProps) {
  return (
    <MarginClamp>
      <p>Favoites</p>
    </MarginClamp>
  )
}
