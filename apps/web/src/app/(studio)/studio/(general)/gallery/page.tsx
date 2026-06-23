import StudioGallery from "./StudioGallery"
import { Button } from "@/components/ui/button"
import { Group, MarginGutter } from "@/components/ui/group"
import {
  fetchCharacterGalleryFolders,
  fetchSelfCharacters,
  fetchUserGallery,
} from "@/utils/api"
import type { Folder } from "@/types/characters"
import Link from "next/link"
import { LuUpload } from "react-icons/lu"

async function loadStudioGalleryFolders(): Promise<Folder[]> {
  const characters = await fetchSelfCharacters().catch(() => [])
  const folderGroups = await Promise.all(
    characters.map((character) =>
      fetchCharacterGalleryFolders(character.id).catch(() => [] as Folder[])
    )
  )

  return folderGroups.flat()
}

export default async function Page() {
  const [artworks, folders] = await Promise.all([
    fetchUserGallery(),
    loadStudioGalleryFolders(),
  ])

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
        <StudioGallery artworks={artworks} folders={folders} />
      </Group>
    </MarginGutter>
  )
}
