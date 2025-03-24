"use client"

import Image from "next/image"
import { Button } from "@mav/ui/components/buttons"
import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import { FaCircle } from "react-icons/fa"
import {
  LuBook,
  LuCat,
  LuCircle,
  LuCircleDot,
  LuClock,
  LuFileEdit,
  LuGalleryThumbnails,
  LuHeart,
  LuHome,
  LuLock,
  LuMoreVertical
} from "react-icons/lu"
import { Visibility } from "@/types/utils"

interface ProfileMastheadProps {
  characterName: string
  species?: string
  pronouns?: string
  toyhouseMigrationLink?: string
  avatarUrl?: string
  ownerHandle?: string
  visibility?: Visibility
}

export function CharacterMasthead(props: Partial<ProfileMastheadProps>) {
  const profileTabs: MastheadTabItems = [
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
  ]

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
              <Button icon={<LuMoreVertical size={18} />} />
            </div>
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="relative flex items-center">
              <span className="text-700 pr-3  text-lg">Species</span>
              <FaCircle size={6} />
              <span className="text-700 pl-3 text-lg">He/Hum</span>
            </div>
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="relative flex items-center">
              <span className="text-700 pr-3  text-lg">Created by</span>
              <Image
                src="/UserProfile.png"
                width={28}
                height={28}
                className="rounded-full"
                alt={`${props.ownerHandle} avatar`}
              />
              <span className="text-700 pl-3 text-lg">{props.ownerHandle}</span>
            </div>
          </Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs
        baseURL={`/@${props.ownerHandle}/${props.characterName}/`}
        items={profileTabs}
      />
    </Masthead>
  )
}
