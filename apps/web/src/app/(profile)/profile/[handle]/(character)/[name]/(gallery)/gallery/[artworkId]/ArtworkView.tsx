import Avatar from "@/components/Avatar"
import ArtistCreditDisplay from "@/components/ArtistCreditDisplay"
import ArtistPlatformIcon from "@/components/ArtistPlatformIcon"
import NsfwMedia from "@/components/NsfwMedia"
import VisibilityOwnerBadge from "@/components/VisibilityOwnerBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { User } from "@/app/context/AuthContext"
import type { Artwork, Character } from "@/types/characters"
import type { Comments } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { resolveArtistCredit } from "@mav/shared"
import Link from "next/link"
import {
  LuHeart,
  LuMoreVertical,
  LuPencil,
  LuShare2,
} from "react-icons/lu"
import ArtworkComments from "./ArtworkComments"

function CharacterTag({
  character,
  ownerHandle,
}: {
  character: Character
  ownerHandle: string
}) {
  const handle = character.owner?.handle ?? ownerHandle
  const slug = character.slug

  if (!slug) {
    return (
      <div className="border-border flex items-center gap-2 rounded-md border px-3 py-2">
        <Avatar
          src={character.avatarUrl || USER_DEFAULT_AVATAR}
          username={character.name}
          size={28}
        />
        <span className="truncate text-sm font-medium">{character.name}</span>
      </div>
    )
  }

  return (
    <Link
      href={`/@${handle}/${slug}`}
      className="border-border hover:bg-muted/50 flex items-center gap-2 rounded-md border px-3 py-2 transition-colors"
    >
      <Avatar
        src={character.avatarUrl || USER_DEFAULT_AVATAR}
        username={character.name}
        size={28}
      />
      <span className="truncate text-sm font-medium">{character.name}</span>
    </Link>
  )
}

export default function ArtworkView({
  artwork,
  ownerHandle,
  characterSlug,
  self,
  isOwner,
}: {
  artwork: Artwork
  ownerHandle: string
  characterSlug: string
  self: User | null
  isOwner: boolean
}) {
  const resolvedArtist = resolveArtistCredit(artwork)
  const redirectPath = `/@${ownerHandle}/${characterSlug}/gallery/${artwork.id}`
  const featuredCharacters = artwork.charactersFeatured ?? []
  const comments = (artwork.comments ?? []) as Comments[]

  return (
    <div className="pb-12">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-start">
        <div className="bg-muted/20 border-border flex min-h-[28rem] items-center justify-center overflow-hidden rounded-lg border p-4">
          {artwork.artworkUrl ? (
            <div className="relative h-full min-h-[24rem] w-full">
              <NsfwMedia
                src={artwork.artworkUrl}
                alt={artwork.altText ?? artwork.title ?? "Artwork"}
                nsfw={!!artwork.nsfw}
                fill
                className="object-contain"
                containerClassName="relative h-full min-h-[24rem] w-full"
              />
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No artwork image.</p>
          )}
        </div>

        <aside className="flex flex-col gap-4">
          {isOwner ? (
            <section className="border-primary/20 bg-primary/5 rounded-lg border p-4">
              <h2 className="mb-2 text-sm font-semibold">Edit artwork</h2>
              <p className="text-muted-foreground mb-3 text-xs leading-relaxed">
                Update the title, description, tags, NSFW flag, and other details
                for this piece.
              </p>
              <Button asChild className="w-full gap-2" variant="secondary">
                <Link href={`/studio/gallery/${artwork.id}/edit`}>
                  <LuPencil size={16} />
                  Open editor
                </Link>
              </Button>
            </section>
          ) : null}

          <section className="border-border rounded-lg border p-4">
            <h2 className="mb-3 text-sm font-semibold">Tools</h2>
            <div className="space-y-1">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                Program
              </p>
              <p className="text-sm">
                {artwork.programUsed?.trim() || "Not specified"}
              </p>
            </div>
          </section>

          <section className="border-border rounded-lg border p-4">
            <h2 className="mb-3 text-sm font-semibold">Characters</h2>
            {featuredCharacters.length > 0 ? (
              <div className="flex flex-col gap-2">
                {featuredCharacters.map((character) => (
                  <CharacterTag
                    key={character.id}
                    character={character}
                    ownerHandle={ownerHandle}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tagged characters.</p>
            )}
          </section>
        </aside>
      </div>

      <header className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {resolvedArtist?.avatarUrl ? (
            <Avatar
              src={resolvedArtist.avatarUrl || USER_DEFAULT_AVATAR}
              username={resolvedArtist.label}
              size={44}
              className="shrink-0"
            />
          ) : resolvedArtist ? (
            <ArtistPlatformIcon
              platform={resolvedArtist.platform}
              size="lg"
              className="shrink-0"
            />
          ) : (
            <Avatar
              src={USER_DEFAULT_AVATAR}
              username="Unknown artist"
              size={44}
              className="shrink-0"
            />
          )}
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              {artwork.title ?? "Untitled artwork"}
            </h1>
            {isOwner ? (
              <VisibilityOwnerBadge
                visibility={artwork.visibility}
                className="border-primary/30 bg-primary/5 text-primary mt-2 gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
              />
            ) : null}
            <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-1.5 text-sm leading-none">
              {resolvedArtist ? (
                <ArtistCreditDisplay
                  credit={resolvedArtist}
                  prefix="by "
                  showIcon={false}
                  linkClassName="text-muted-foreground hover:text-foreground"
                />
              ) : (
                <span>by Unknown artist</span>
              )}
              {resolvedArtist ? (
                resolvedArtist.isInternal ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full px-3 text-xs"
                    asChild
                  >
                    <Link href={resolvedArtist.href}>Visit</Link>
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 rounded-full px-3 text-xs"
                    asChild
                  >
                    <a
                      href={resolvedArtist.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" type="button" aria-label="Favorite">
            <LuHeart size={18} />
          </Button>
          <Button variant="ghost" size="icon" type="button" aria-label="Share">
            <LuShare2 size={18} />
          </Button>
          <Button variant="ghost" size="icon" type="button" aria-label="More options">
            <LuMoreVertical size={18} />
          </Button>
        </div>
      </header>

      {artwork.description ? (
        <section className="mt-6">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {artwork.description}
          </p>
        </section>
      ) : null}

      {artwork.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {artwork.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      ) : null}

      <ArtworkComments
        artworkId={artwork.id}
        comments={comments}
        self={self}
        redirectPath={redirectPath}
      />
    </div>
  )
}
