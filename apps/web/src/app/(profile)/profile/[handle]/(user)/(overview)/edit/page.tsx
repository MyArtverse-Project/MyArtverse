import EditOverviewClient from "@/components/layouts/Panels/EditOverviewClient"
import type { DefineRouteParams } from "@/types"
import { fetchUser, getPanels } from "@/utils/api"
import { loadOverviewArtworks } from "@/utils/loadOverviewArtworks"

type AsyncProps = DefineRouteParams<{ handle: string }>

export default async function Page({ params }: AsyncProps) {
  const { handle } = await params
  const [userData, panels] = await Promise.all([
    fetchUser(handle),
    getPanels(handle).catch(() => []),
  ])
  const artworks = await loadOverviewArtworks(handle, {
    user: userData,
    panels,
  })

  return (
    <EditOverviewClient
      panels={panels}
      context="user"
      characters={userData.characters ?? []}
      artworks={artworks}
      backHref={`/@${handle}`}
    />
  )
}
