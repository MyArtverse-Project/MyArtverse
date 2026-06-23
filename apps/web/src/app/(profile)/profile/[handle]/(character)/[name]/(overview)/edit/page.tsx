import EditOverviewClient from "@/components/layouts/Panels/EditOverviewClient"
import type { DefineRouteParams } from "@/types"
import { getPanels } from "@/utils/api"
import { loadCharacter } from "@/utils/loadCharacter"
import { loadOverviewArtworks } from "@/utils/loadOverviewArtworks"

type AsyncProps = DefineRouteParams<{ handle: string; name: string }>

export default async function Page({ params }: AsyncProps) {
  const { handle, name } = await params
  const [character, panels] = await Promise.all([
    loadCharacter(handle, name),
    getPanels(handle, name).catch(() => []),
  ])
  const artworks = await loadOverviewArtworks(handle, {
    characterSlug: name,
  })

  return (
    <EditOverviewClient
      panels={panels}
      context="character"
      characterName={name}
      artworks={artworks}
      refSheets={character.refSheets ?? []}
      backHref={`/@${handle}/${name}`}
    />
  )
}
