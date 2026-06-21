import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { buildCharacterOverviewMetadata } from "@/utils/artworkMetadata"
import { fetchCharacter, fetchUserData, getPanels } from "@/utils/api"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import OverviewContent from "./OverviewContent"
import { DefineRouteParams } from "@/types"
import { User } from "@/app/context/AuthContext"

type AsyncProps = DefineRouteParams<{ handle: string; name: string }>

export async function generateMetadata({
  params,
}: AsyncProps): Promise<Metadata> {
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

export default async function Page({ params }: AsyncProps) {
  const { handle, name } = await params
  const self = await fetchUserData() as unknown as User | null
  const character = await fetchCharacter(handle, name)
  const panels = await getPanels(handle, name)

  return (
    <MarginClamp>
      <OverviewContent character={character} self={self} panels={panels} />
    </MarginClamp>
  )
}
