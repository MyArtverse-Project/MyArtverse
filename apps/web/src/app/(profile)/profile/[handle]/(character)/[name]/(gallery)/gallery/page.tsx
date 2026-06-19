import ArtworkGrid from "@/components/ArtworkGrid"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { getArtworks } from "@/utils/api"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string; name: string }>
}) {
  const { handle, name } = await params
  const artworks = await getArtworks(handle, name)

  return (
    <MarginClamp>
      {artworks.length > 0 ? (
        <ArtworkGrid artworks={artworks} className="gap-1.5" />
      ) : (
        <div>No artworks found</div>
      )}
    </MarginClamp>
  )
}
