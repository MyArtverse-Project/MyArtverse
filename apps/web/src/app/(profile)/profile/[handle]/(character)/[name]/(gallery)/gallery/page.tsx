import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import { getArtworks } from "@/utils/api"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"
import Image from "next/image"

export async function generateMetadata(): Promise<Metadata> {
  // TODO add a simple check if their name ends with an "s"; for example "Dennis"
  // TODO it should display: "Dennis' characters", etc
  const userPlaceholder = "User"

  return {
    title: `${userPlaceholder}'s characters`,
    description: `See ${userPlaceholder}'s characters and others on ${BRAND} by creating an account!`
  }
}

export default async function Page({ params }: { params: { handle: string; name: string } }) {
  const { handle, name } = await params
  const artworks = await getArtworks(handle, name)
  return (
    <MarginClamp>
      {artworks.length > 0 ? (
        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {artworks.map(artwork => {
            if (!artwork.artworkUrl) return null
            return (
              <Image key={artwork.id} src={artwork.artworkUrl} alt={artwork.title} width={300} height={300} className="object-cover" />
            )
          })}
        </GridResponsive>
      ) : (
        <div>No artworks found</div>
      )}
    </MarginClamp>
  )
}
