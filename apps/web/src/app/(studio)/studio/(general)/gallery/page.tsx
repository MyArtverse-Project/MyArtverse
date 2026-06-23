import StudioGallery from "./StudioGallery"
import { Button } from "@/components/ui/button"
import { Group, MarginGutter } from "@/components/ui/group"
import { fetchUserGallery } from "@/utils/api"
import Link from "next/link"
import { LuUpload } from "react-icons/lu"

export default async function Page() {
  const artworks = await fetchUserGallery().catch(() => [])

  return (
    <MarginGutter screenSize="xl" className="space-y-6 px-6 py-8">
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
        <StudioGallery artworks={artworks} />
      </Group>
    </MarginGutter>
  )
}
