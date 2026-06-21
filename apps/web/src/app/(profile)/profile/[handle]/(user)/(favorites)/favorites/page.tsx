import { CharacterCard } from "@/components/layouts/Cards"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { buildPageMetadata, possessiveName } from "@/utils/metadata"
import { fetchUser, getFavorites } from "@/utils/api"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params

  try {
    const user = await fetchUser(handle)
    const displayName = user.displayName ?? handle

    return buildPageMetadata({
      title: `${possessiveName(displayName)} Favorites`,
      description: `See characters favorited by @${handle} on ${BRAND}.`,
      path: `/@${handle}/favorites`,
      image: user.avatarUrl ?? null,
      imageAlt: `${displayName}'s favorites`,
    })
  } catch {
    return buildPageMetadata({
      title: "Favorites",
      description: `View favorites on ${BRAND}.`,
      path: `/@${handle}/favorites`,
    })
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = (await params) as { handle: string }
  const favs = await getFavorites(handle)

  return (
    <MarginClamp>
      <Suspense fallback={<Loading />}>
        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {favs.map((character, index) => (
            <CharacterCard
              character={character}
              name={character.name}
              img={character.avatarUrl || "/UserProfile.png"}
              species={character.species}
              key={index}
              href={`/@${character.owner.handle}/${character.slug}`}
            />
          ))}
        </GridResponsive>
      </Suspense>
    </MarginClamp>
  )
}
