"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { followUser, unfollowUser } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FollowButton({
  profileId,
  initialIsFollowing,
  soft = false,
}: {
  profileId: string
  initialIsFollowing: boolean
  soft?: boolean
}) {
  const router = useRouter()
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)

  const toggleFollow = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      if (isFollowing) {
        await unfollowUser(profileId)
        setIsFollowing(false)
      } else {
        await followUser(profileId)
        setIsFollowing(true)
      }
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant={soft ? "secondary" : isFollowing ? "outline" : "default"}
      size={soft ? "sm" : "default"}
      onClick={toggleFollow}
      disabled={isLoading}
      className={cn(
        soft &&
          "shrink-0 rounded-full border-0 bg-primary/10 px-4 text-primary shadow-none hover:bg-primary/15",
        soft && isFollowing && "bg-muted text-muted-foreground hover:bg-muted"
      )}
    >
      {isFollowing ? (soft ? "Following" : "Unfollow") : "Follow"}
    </Button>
  )
}
