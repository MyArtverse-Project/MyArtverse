import ArtworkView from "./ArtworkView"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { buildArtworkMetadata } from "@/utils/artworkMetadata"
import { fetchUserData, getArtwork } from "@/utils/api"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; name: string; artworkId: string }>
}): Promise<Metadata> {
  const { handle, name, artworkId } = await params
  const artwork = await getArtwork(artworkId).catch(() => null)

  if (!artwork?.id) {
    return buildPageMetadata({
      title: "Artwork",
      description: `View artwork on ${BRAND}.`,
      path: `/@${handle}/${name}/gallery/${artworkId}`,
    })
  }

  return buildArtworkMetadata({ artwork, handle, characterSlug: name })
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ handle: string; name: string; artworkId: string }>
}) {
  const { handle, name, artworkId } = await params
  const [artwork, self] = await Promise.all([
    getArtwork(artworkId).catch(() => null),
    fetchUserData().catch(() => null),
  ])

  if (!artwork?.id) {
    notFound()
  }

  return (
    <MarginClamp>
      <ArtworkView
        artwork={artwork}
        ownerHandle={handle}
        characterSlug={name}
        self={self}
      />
    </MarginClamp>
  )
}
