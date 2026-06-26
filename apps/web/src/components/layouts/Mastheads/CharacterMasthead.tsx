"use client"

import Avatar from "@/components/Avatar"
import { MastheadScrollTitle } from "@/components/layouts/Mastheads/MastheadScrollTitle"
import {
  MastheadAvatar,
  MastheadDetails,
  MastheadLayer,
  MastheadWrapper
} from "@/components/layouts/Mastheads/MastheadParts"
import {
  MastheadTabs,
  type MastheadTabItem
} from "@/components/layouts/Mastheads/MastheadTabs"
import { Button } from "@/components/ui/button"
import VisibilityOwnerBadge from "@/components/VisibilityOwnerBadge"
import { cn } from "@/lib/utils"
import type { Visibility } from "@/types/utils"
import { isRestrictedVisibility } from "@/utils/visibility"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { displayPronouns, displaySpecies } from "@/utils/displayer"
import Link from "next/link"
import { FaCircle } from "react-icons/fa"
import {
  LuBook,
  LuClock,
  LuGalleryThumbnails,
  LuHeart,
  LuHome,
  LuMoreVertical
} from "react-icons/lu"

interface ProfileMastheadProps {
  characterName: string
  characterId: string
  species?: string
  characterSlug: string
  pronouns?: string
  toyhouseMigrationLink?: string
  avatarUrl?: string
  ownerHandle?: string
  ownerAvatarUrl?: string
  visibility?: Visibility
  isOwner?: boolean
}

export function CharacterMasthead(props: Partial<ProfileMastheadProps>) {
  const profileTabs = [
    {
      icon: LuHome,
      text: "Overview",
      link: ""
    },
    {
      icon: LuGalleryThumbnails,
      text: "Gallery",
      link: "gallery"
    },
    {
      icon: LuBook,
      text: "Biography",
      link: "biography"
    },
    {
      icon: LuClock,
      text: "Activity",
      link: "activity"
    }
  ] satisfies MastheadTabItem[]

  return (
    <div className="contents">
      <MastheadWrapper>
        <MastheadAvatar
          src={props.avatarUrl}
          alt={props.characterName ?? "Character"}
          rounded="xl"
        />
        <MastheadDetails>
          <MastheadLayer spaceBetween>
            <div className="flex flex-row items-center gap-x-4">
              <MastheadScrollTitle
                scrollTitle={{
                  kind: "character",
                  href: `/@${props.ownerHandle}/${props.characterSlug}`,
                  label: `@${props.ownerHandle} / ${props.characterName}`,
                  primary: props.characterName ?? "",
                  secondary: props.ownerHandle,
                  avatarUrl: props.avatarUrl,
                  ownerAvatarUrl: props.ownerAvatarUrl,
                  ownerHref: props.ownerHandle
                    ? `/@${props.ownerHandle}`
                    : undefined
                }}
                className="text-4xl font-semibold"
              >
                {props.characterName}
              </MastheadScrollTitle>
              {props.isOwner && isRestrictedVisibility(props.visibility) ? (
                <VisibilityOwnerBadge visibility={props.visibility} />
              ) : null}
            </div>
            <div className="flex gap-x-2">
              <Button variant="outline" asChild>
                <Link href="/settings/profile">
                  <LuHeart size={18} />
                  Favorite
                </Link>
              </Button>
              {props.isOwner && (
                <Button variant="outline" asChild>
                  <Link href={`/studio/characters/${props.characterId}`}>
                    Edit
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="icon" aria-label="More options">
                <LuMoreVertical size={18} />
              </Button>
            </div>
          </MastheadLayer>
          <MastheadLayer>
            <div className="text-muted-foreground relative flex items-center text-lg">
              <span className="pr-3">
                {props.species ? displaySpecies(props.species) : "Unknown"}
              </span>
              <FaCircle size={6} />
              <span className="pl-3">
                {props.pronouns ? displayPronouns(props.pronouns) : "Unknown"}
              </span>
            </div>
          </MastheadLayer>
          <MastheadLayer>
            <div className="relative flex items-center gap-x-3">
              <span className="text-muted-foreground text-lg">Created by</span>
              {props.ownerHandle && (
                <Link
                  href={`/@${props.ownerHandle}`}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-medium",
                    "border border-border/25 bg-muted/20 text-foreground/90",
                    "shadow-sm ring-1 ring-inset ring-white/[0.06]",
                    "transition-all duration-200",
                    "hover:border-primary/30 hover:bg-muted/50 hover:text-foreground hover:shadow-md hover:ring-primary/10"
                  )}
                >
                  <Avatar
                    src={props.ownerAvatarUrl || USER_DEFAULT_AVATAR}
                    username={props.ownerHandle}
                    size={24}
                  />
                  <span>@{props.ownerHandle}</span>
                </Link>
              )}
            </div>
          </MastheadLayer>
        </MastheadDetails>
      </MastheadWrapper>
      <MastheadTabs
        baseURL={`/@${props.ownerHandle}/${props.characterSlug}/`}
        items={profileTabs}
      />
    </div>
  )
}
