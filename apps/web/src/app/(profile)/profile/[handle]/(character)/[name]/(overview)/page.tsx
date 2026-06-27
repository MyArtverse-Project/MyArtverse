import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { buildCharacterOverviewMetadata } from "@/utils/artworkMetadata"
import { fetchCharacter, fetchUserDataOptional, getPanels } from "@/utils/api"
import { loadCharacter } from "@/utils/loadCharacter"
import { loadOverviewArtworks } from "@/utils/loadOverviewArtworks"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import OverviewContent from "./OverviewContent"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}): Promise<Metadata> {
  const { handle, name } = await params

  try {
    const character = await fetchCharacter(handle, name)

    return buildCharacterOverviewMetadata({
      characterName: character.name,
      handle,
      characterSlug: name,
      bio: character.attributes?.bio,
      avatarUrl: character.avatarUrl,
    })
  } catch {
    return buildPageMetadata({
      title: "Character",
      description: `View a character profile on ${BRAND}.`,
      path: `/@${handle}/${name}`,
    })
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params

  const [self, character, panels] = await Promise.all([
    fetchUserDataOptional(),
    loadCharacter(handle, name),
    getPanels(handle, name).catch(() => []),
  ])
  const artworks = await loadOverviewArtworks(handle, {
    characterSlug: name,
  })

  return (
    <MarginClamp>
      <OverviewContent
        character={character}
        self={self}
        panels={panels}
        artworks={artworks}
      />
    </MarginClamp>
  )
}
