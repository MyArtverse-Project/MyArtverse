"use client"

import NsfwMedia from "@/components/NsfwMedia"
import { Artwork, Character } from "@/types/characters"
import { UserType } from "@/types/users"
import { SearchResult } from "@/types/utils"
import { resolveArtworkGalleryHref } from "@/utils/galleryUtils"
import Link from "next/link"

interface SearchSectionProps {
  title: string
  items?: string[] | { name: string; image?: string }[] | SearchResult
  category?: "user" | "character" | "artwork"
  isCharacter?: boolean
  variant?: "dropdown" | "page"
}

type FormattedItem = {
  name: string
  subtitle?: string
  image?: string
  href: string
  nsfw?: boolean
}

function formatUser(user: UserType): FormattedItem {
  return {
    name: user.displayName || user.handle,
    subtitle: user.displayName ? `@${user.handle}` : undefined,
    image: user.avatarUrl,
    href: `/@${user.handle}`,
  }
}

function formatCharacter(char: Character): FormattedItem {
  const slug = char.slug || char.name
  const href = char.owner?.handle
    ? `/@${char.owner.handle}/${slug}`
    : `/search?q=${encodeURIComponent(char.name)}&type=characters`

  return {
    name: char.name,
    subtitle: char.owner?.handle ? `@${char.owner.handle}` : undefined,
    image: char.avatarUrl,
    href,
  }
}

function formatArtwork(art: Artwork): FormattedItem {
  const href =
    resolveArtworkGalleryHref(art, art.owner?.handle ?? "") ??
    `/@${art.owner?.handle ?? ""}`

  return {
    name: art.title || "Untitled Artwork",
    subtitle: art.owner?.handle ? `@${art.owner.handle}` : undefined,
    image: art.artworkUrl || art.watermarkUrl,
    href,
    nsfw: !!art.nsfw,
  }
}

export function SearchSection({
  title,
  items,
  category,
  variant = "dropdown",
}: SearchSectionProps) {
  let formattedItems: FormattedItem[] = []

  if (!items) {
    return null
  }

  if (Array.isArray(items)) {
    formattedItems = items.map((item) =>
      typeof item === "string"
        ? { name: item, href: `/search?q=${encodeURIComponent(item)}` }
        : {
            name: item.name,
            image: item.image,
            href: `/search?q=${encodeURIComponent(item.name)}`,
          }
    )
  } else if (typeof items === "object") {
    if (category === "user") {
      formattedItems = (items.user ?? []).map(formatUser)
    } else if (category === "character") {
      formattedItems = (items.character ?? []).map(formatCharacter)
    } else if (category === "artwork") {
      formattedItems = (items.artwork ?? []).map(formatArtwork)
    } else {
      formattedItems = [
        ...(items.user?.map(formatUser) ?? []),
        ...(items.character?.map(formatCharacter) ?? []),
        ...(items.artwork?.map(formatArtwork) ?? []),
      ]
    }
  }

  if (formattedItems.length === 0) {
    return null
  }

  const isPage = variant === "page"

  return (
    <div className={isPage ? "mb-6" : "mt-4"}>
      <h3
        className={
          isPage
            ? "text-muted-foreground mb-3 text-xs font-semibold tracking-wide"
            : "text-muted-foreground mb-2 text-sm"
        }
      >
        {title}
      </h3>
      <ul className={isPage ? "flex flex-col" : undefined}>
        {formattedItems.map((item) => (
          <li
            key={`${item.href}-${item.name}`}
            className={
              isPage
                ? "hover:bg-muted/40 flex rounded-lg transition-colors"
                : "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-2 rounded px-2 py-1"
            }
          >
            <Link
              href={item.href}
              className={
                isPage
                  ? "flex min-w-0 flex-1 items-center gap-3 px-2 py-3"
                  : "flex min-w-0 flex-1 items-center gap-2"
              }
            >
              {item.image && (
                <span
                  className={
                    isPage
                      ? "relative size-12 shrink-0 overflow-hidden rounded-full"
                      : "relative h-8 w-8 shrink-0 overflow-hidden rounded-full"
                  }
                >
                  <NsfwMedia
                    src={item.image}
                    alt={item.name}
                    nsfw={item.nsfw}
                    fill
                    compact={!isPage}
                    className="object-cover"
                    containerClassName={
                      isPage ? "size-12 rounded-full" : "h-8 w-8 rounded-full"
                    }
                  />
                </span>
              )}
              <span className="min-w-0">
                <span
                  className={
                    isPage ? "block truncate font-semibold" : "block truncate"
                  }
                >
                  {item.name}
                </span>
                {item.subtitle && (
                  <span className="text-muted-foreground block truncate text-sm">
                    {item.subtitle}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
