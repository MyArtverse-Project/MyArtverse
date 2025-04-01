import { SearchResult, Character, Artwork, UserType } from "@/types/utils"

interface SearchSectionProps {
  title: string
  items?: string[] | { name: string; image?: string }[] | SearchResult
  isCharacter?: boolean
}

export function SearchSection({ title, items, isCharacter = false }: SearchSectionProps) {
  let formattedItems: { name: string; image?: string }[] = []

  if (!items) {
    return null
  }

  if (Array.isArray(items)) {
    formattedItems = items.map((item) =>
      typeof item === "string"
        ? { name: item }
        : { name: item.name, image: (item as { image?: string }).image }
    )
  } else if (typeof items === "object") {
    formattedItems = [
      ...(items.user?.map((user: UserType) => ({
        name: user.displayName || user.handle,
        image: user.avatarUrl,
      })) ?? []),
      ...(items.character?.map((char: Character) => ({
        name: char.name,
        image: char.avatarUrl,
      })) ?? []),
      ...(items.artwork?.map((art: Artwork) => ({
        name: art.title || "Untitled Artwork",
        image: art.artworkUrl || art.watermarkUrl,
      })) ?? []),
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
            {item.image && (
              <img src={item.image} alt={item.name} className="w-6 h-6 rounded-full" />
            )}
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
