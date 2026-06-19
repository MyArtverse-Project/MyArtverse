import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import ArtworkGrid from "@/components/ArtworkGrid"
import { Button } from "@/components/ui/button"
import { Group, MarginGutter } from "@/components/ui/group"
import { fetchUserGallery } from "@/utils/api"
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
          <ArtworkGrid artworks={artworks} />
        ) : (
          <div className="text-muted-foreground text-sm">No artworks found.</div>
        )}
      </Group>
    </MarginGutter>
  )
}
