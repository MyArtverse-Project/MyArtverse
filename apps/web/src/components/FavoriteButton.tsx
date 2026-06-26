"use client"

import { Button } from "@/components/ui/button"
import { favoriteArtwork, favoriteCharacter } from "@/utils/api"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LuHeart } from "react-icons/lu"

type FavoriteTarget = "character" | "artwork"

export default function FavoriteButton({
  targetId,
  targetType,
  isFavorited,
  showLabel = false,
  className,
}: {
  targetId: string
  targetType: FavoriteTarget
  isFavorited: boolean
  showLabel?: boolean
  className?: string
}) {
  const router = useRouter()
  const [favorited, setFavorited] = useState(isFavorited)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setFavorited(isFavorited)
  }, [isFavorited])

  const toggleFavorite = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      if (targetType === "character") {
        await favoriteCharacter(targetId)
      } else {
        await favoriteArtwork(targetId)
      }
      setFavorited((current) => !current)
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant={showLabel ? "outline" : "ghost"}
      size={showLabel ? "default" : "icon"}
      onClick={toggleFavorite}
      disabled={isLoading}
      aria-label={favorited ? "Unfavorite" : "Favorite"}
      aria-pressed={favorited}
      className={cn(className)}
    >
      <LuHeart
        size={18}
        className={cn(favorited && "fill-current text-red-500")}
      />
      {showLabel ? (favorited ? "Favorited" : "Favorite") : null}
    </Button>
  )
}
