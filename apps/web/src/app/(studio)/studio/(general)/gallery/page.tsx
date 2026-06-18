import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import { Button } from "@/components/ui/button"
import { Group, MarginGutter } from "@/components/ui/group"
import { fetchUserGallery } from "@/utils/api"
import Image from "next/image"
import Link from "next/link"
import { LuUpload } from "react-icons/lu"

export default async function Page() {
  const artworks = await fetchUserGallery()

  return (
    <MarginGutter screenSize="xl" className="px-6 py-8 space-y-6">
      <Group
        title="Gallery"
        potentialActions={
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/studio/gallery/upload">
                <LuUpload />
                Upload Artwork
              </Link>
            </Button>
          </div>
        }
      >
        {artworks.length > 0 ? (
          <GridResponsive breakpoint={250} className="gap-4" role="listbox">
            {artworks.map((artwork) => {
              if (!artwork.artworkUrl) return null

              return (
                <div
                  key={artwork.id}
                  className="overflow-hidden rounded-xl border aspect-square"
                >
                  <Image
                    src={artwork.artworkUrl}
                    alt={artwork.altText ?? "Artwork"}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )
            })}
          </GridResponsive>
        ) : (
          <div className="text-muted-foreground text-sm">No artworks found.</div>
        )}
      </Group>
    </MarginGutter>
  )
}
