import { Character, Artwork } from "@/types/characters"
import { UserType } from "@/types/users"
import { SearchResult } from "@/types/utils"
import Link from "next/link"

interface SearchSectionProps {
  title: string
  items?: string[] | { name: string; image?: string }[] | SearchResult
  isCharacter?: boolean
}

export function SearchSection({ title, items }: SearchSectionProps) {
  let formattedItems: { name: string; image?: string; href: string }[] = []

  if (!items) {
    return null
  }

  if (Array.isArray(items)) {
    formattedItems = items.map((item) =>
      typeof item === "string"
        ? { name: item }
        : {
            name: item.name,
            image: (item as { image?: string }).image,
            href: `/search?q=${item.name}`
          }
    )
  } else if (typeof items === "object") {
    formattedItems = [
      ...(items.user?.map((user: UserType) => ({
        name: user.displayName || user.handle,
        image: user.avatarUrl,
        href: `/@${user.handle}`
      })) ?? []),
      ...(items.character?.map((char: Character) => ({
        name: char.name,
        image: char.avatarUrl,
        href: `/@${char.owner.handle}/${char.name}`
      })) ?? []),
      ...(items.artwork?.map((art: Artwork) => ({
        name: art.title || "Untitled Artwork",
        image: art.artworkUrl || art.watermarkUrl,
        href: `/artworks/${art.id}`
      })) ?? [])
    ]
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm text-500 mb-2">{title}</h3>
      <ul>
        {formattedItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 py-1 cursor-pointer hover:bg-300 px-2 rounded"
          >
            <Link href={item.href || "#"} className="flex items-center gap-2">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-6 h-6 rounded-full"
                />
              )}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
