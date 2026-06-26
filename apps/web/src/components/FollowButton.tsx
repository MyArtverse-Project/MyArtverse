"use client"

import { Button } from "@/components/ui/button"
import { followUser, unfollowUser } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function FollowButton({
  profileId,
  initialIsFollowing,
}: {
  profileId: string
  initialIsFollowing: boolean
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
      variant={isFollowing ? "outline" : "default"}
      onClick={toggleFollow}
      disabled={isLoading}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}
