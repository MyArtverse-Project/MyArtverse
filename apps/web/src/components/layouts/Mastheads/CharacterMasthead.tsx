"use client"

import Avatar from "@/components/Avatar"
import type { Visibility } from "@/types/utils"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { Button } from "@mav/ui/components/buttons"
import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import Link from "next/link"
import { FaCircle } from "react-icons/fa"
import {
  LuBook,
  LuClock,
  LuGalleryThumbnails,
  LuHeart,
  LuHome,
  LuLock,
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
  ] satisfies MastheadTabItems

  return (
    <Masthead>
      <Masthead.Wrapper>
        <Masthead.Avatar src={props.avatarUrl} />
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <div className="flex flex-row items-center gap-x-4">
              <span className="text-4xl">{props.characterName}</span>
              <span className="text-700">
                {props.visibility === "private" && (
                  <div className="border-1 border-400 flex items-center gap-x-2 rounded-full border px-6 py-1">
                    <LuLock /> Visible for followers
                  </div>
                )}
              </span>
            </div>
            <div className="flex gap-x-2">
              <Button href="/settings/profile" icon={<LuHeart size={18} />}>
                Favorite
              </Button>
              {props.isOwner && (
                <Button href={`/studio/characters/${props.characterId}`}>
                  Edit
                </Button>
              )}
              <Button icon={<LuMoreVertical size={18} />} />
            </div>
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="relative flex items-center">
              <span className="text-700 pr-3  text-lg capitalize">{props.species}</span>
              <FaCircle size={6} />
              <span className="text-700 pl-3 text-lg">{props.pronouns}</span>
            </div>
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="relative flex items-center gap-x-3">
              <span className="text-700 text-lg">Created by</span>
              {props.ownerHandle && (
                <Link
                  href={`/@${props.ownerHandle}`}
                  className="border-border bg-muted/50 hover:bg-muted inline-flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-medium transition-colors"
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
          </Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs
        baseURL={`/@${props.ownerHandle}/${props.characterSlug}/`}
        items={profileTabs}
      />
    </Masthead>
  )
}