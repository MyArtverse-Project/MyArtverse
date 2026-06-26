"use client"

import CommentAuthorBadges from "@/components/comments/CommentAuthorBadges"
import FollowButton from "@/components/FollowButton"
import Modal from "@/components/layouts/Modal"
import { Badge } from "@/components/ui/badge"
import type { UserType } from "@/types/users"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { formatCompactCount } from "@/utils/formatCompactCount"
import { cn } from "@mav/shared/utils"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { LuBook, LuX } from "react-icons/lu"

type RelationTab = "follower" | "following"

function RelationTabButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-1 pb-3 text-base font-medium transition-colors",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors",
        active
          ? "text-primary after:bg-primary"
          : "text-muted-foreground after:bg-transparent hover:text-foreground"
      )}
    >
      <LuBook size={18} aria-hidden className={active ? "text-primary" : undefined} />
      <span>{label}</span>
    </button>
  )
}

function RelationUserRow({
  user,
  followsViewer,
  viewerFollowsUser,
  showFollowButton,
}: {
  user: UserType
  followsViewer: boolean
  viewerFollowsUser: boolean
  showFollowButton: boolean
}) {
  const followerCount = user.followers?.length ?? 0
  const followingCount = user.following?.length ?? 0

  return (
    <div className="flex items-center gap-3 py-4">
      <Link
        href={`/@${user.handle}`}
        className="shrink-0"
      >
        <Image
          src={user.avatarUrl || USER_DEFAULT_AVATAR}
          alt={user.displayName || user.handle}
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Link
            href={`/@${user.handle}`}
            className="truncate font-semibold text-foreground hover:underline"
          >
            {user.displayName || user.handle}
          </Link>
          {followsViewer ? (
            <Badge
              variant="secondary"
              className="rounded-full border-0 bg-primary/10 px-2 py-0 text-xs font-medium text-primary hover:bg-primary/10"
            >
              Follows you
            </Badge>
          ) : null}
          <CommentAuthorBadges author={user} />
        </div>
        <p className="text-muted-foreground mt-0.5 text-sm">
          {formatCompactCount(followerCount)} followers{"  "}
          {formatCompactCount(followingCount)} following
        </p>
      </div>

      {showFollowButton ? (
        <FollowButton
          profileId={user.id}
          initialIsFollowing={viewerFollowsUser}
          soft
        />
      ) : null}
    </div>
  )
}

export default function RelationModal({
  followers,
  following,
  displayRelationsModal,
  toggleRelationsModal,
  startingTab,
  viewerId,
  viewerFollowers = [],
  viewerFollowing = [],
}: {
  followers: UserType[]
  following: UserType[]
  displayRelationsModal: boolean
  toggleRelationsModal: (type?: string) => void
  startingTab: string
  viewerId?: string
  viewerFollowers?: UserType[]
  viewerFollowing?: UserType[]
}) {
  const [tab, setTab] = useState<RelationTab>(
    startingTab === "following" ? "following" : "follower"
  )

  useEffect(() => {
    if (displayRelationsModal) {
      setTab(startingTab === "following" ? "following" : "follower")
    }
  }, [displayRelationsModal, startingTab])

  const viewerFollowerIds = new Set(viewerFollowers.map((user) => user.id))
  const viewerFollowingIds = new Set(viewerFollowing.map((user) => user.id))
  const users = tab === "follower" ? followers : following

  return (
    <Modal
      state={displayRelationsModal}
      toggler={() => toggleRelationsModal()}
      className="w-full max-w-lg rounded-xl border-0 p-0 shadow-xl md:w-[480px]"
    >
      <div className="flex items-start justify-between gap-4 px-6 pt-6">
        <div className="flex gap-6">
          <RelationTabButton
            active={tab === "follower"}
            label="Followers"
            onClick={() => setTab("follower")}
          />
          <RelationTabButton
            active={tab === "following"}
            label="Following"
            onClick={() => setTab("following")}
          />
        </div>
        <button
          type="button"
          onClick={() => toggleRelationsModal()}
          className="text-muted-foreground hover:text-foreground -mr-1 rounded-sm p-1 transition-colors"
          aria-label="Close"
        >
          <LuX size={20} />
        </button>
      </div>

      <Modal.Body className="max-h-[60vh] overflow-y-auto px-6 pb-6 pt-2">
        {users.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            {tab === "follower" ? "No followers yet." : "Not following anyone yet."}
          </p>
        ) : (
          users.map((user) => (
            <RelationUserRow
              key={user.id}
              user={user}
              followsViewer={viewerFollowerIds.has(user.id)}
              viewerFollowsUser={viewerFollowingIds.has(user.id)}
              showFollowButton={Boolean(viewerId && viewerId !== user.id)}
            />
          ))
        )}
      </Modal.Body>
    </Modal>
  )
}
