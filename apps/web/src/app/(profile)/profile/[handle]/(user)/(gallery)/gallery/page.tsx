import UserGalleryView from "./UserGalleryView"
import MarginClamp from "@/components/layouts/Layouts/MarginClamp"
import {
  buildUserGalleryMetadata,
  pickGalleryPreviewImage,
} from "@/utils/artworkMetadata"
import {
  fetchCharacterGalleryFolders,
  fetchUser,
  fetchUserData,
  getUserGallery,
} from "@/utils/api"
import type { Folder } from "@/types/characters"
import { buildPageMetadata } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

async function loadUserGalleryFolders(
  characterIds: string[]
): Promise<Folder[]> {
  const folderGroups = await Promise.all(
    characterIds.map((characterId) =>
      fetchCharacterGalleryFolders(characterId).catch(() => [] as Folder[])
    )
  )

  return folderGroups.flat()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params

  try {
    const [user, artworks] = await Promise.all([
      fetchUser(handle),
      getUserGallery(handle).catch(() => []),
    ])
    const displayName = user.displayName ?? handle

    return buildUserGalleryMetadata({
      displayName,
      handle,
      avatarUrl: user.avatarUrl ?? null,
      previewImage: pickGalleryPreviewImage(artworks),
    })
  } catch {
    return buildPageMetadata({
      title: "Gallery",
      description: `View a user gallery on ${BRAND}.`,
      path: `/@${handle}/gallery`,
    })
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  const [user, artworks, self] = await Promise.all([
    fetchUser(handle),
    getUserGallery(handle).catch(() => []),
    fetchUserData().catch(() => null),
  ])

  const characterIds = user.characters?.map((character) => character.id) ?? []
  const folders = characterIds.length
    ? await loadUserGalleryFolders(characterIds)
    : []
  const isOwner = self?.handle === user.handle

  return (
    <MarginClamp>
      <UserGalleryView
        handle={handle}
        artworks={artworks}
        folders={folders}
        owner={isOwner}
      />
    </MarginClamp>
  )
}
