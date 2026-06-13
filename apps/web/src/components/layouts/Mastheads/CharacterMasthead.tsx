"use client"

import type { Visibility } from "@/types/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
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
import {
  MastheadAvatar,
  MastheadDetails,
  MastheadLayer,
  MastheadWrapper
} from "./MastheadParts"
import { MastheadTabs, type MastheadTabItem } from "./MastheadTabs"

interface CharacterMastheadProps {
  characterName: string
  species?: string
  pronouns?: string
  toyhouseMigrationLink?: string
  avatarUrl?: string
  ownerHandle?: string
  visibility?: Visibility
}

export function CharacterMasthead(props: Partial<CharacterMastheadProps>) {
  const characterTabs: MastheadTabItem[] = [
    { icon: LuHome, text: "Overview", link: "" },
    { icon: LuGalleryThumbnails, text: "Gallery", link: "gallery" },
    { icon: LuBook, text: "Biography", link: "biography" },
    { icon: LuClock, text: "Activity", link: "activity" }
  ]

  return (
    <div>
      <MastheadWrapper>
        <MastheadAvatar
          src={props.avatarUrl}
          alt={props.characterName || "Character"}
          rounded="xl"
        />
        <MastheadDetails>
          <MastheadLayer spaceBetween>
            <div className="flex flex-row items-center gap-x-4">
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                {props.characterName}
              </h1>
              {props.visibility === "private" && (
                <Badge variant="outline" className="gap-x-2 px-4 py-1">
                  <LuLock size={14} /> Visible for followers
                </Badge>
              )}
            </div>
            <div className="flex gap-x-2">
              <Button variant="secondary">
                <LuHeart size={18} />
                Favorite
              </Button>
              <Button variant="ghost" size="icon" aria-label="More options">
                <LuMoreVertical size={18} />
              </Button>
            </div>
          </MastheadLayer>
          <MastheadLayer>
            <div className="text-muted-foreground relative flex items-center gap-x-3 text-lg">
              <span>{props.species ?? "Species"}</span>
              <FaCircle size={6} />
              <span>{props.pronouns ?? "He/Hum"}</span>
            </div>
          </MastheadLayer>
          <MastheadLayer>
            <div className="text-muted-foreground relative flex items-center gap-x-3 text-lg">
              <span>Created by</span>
              <Image
                src="/UserProfile.png"
                width={28}
                height={28}
                className="rounded-full"
                alt={`${props.ownerHandle} avatar`}
              />
              <span className="text-foreground">{props.ownerHandle}</span>
            </div>
          </MastheadLayer>
        </MastheadDetails>
      </MastheadWrapper>
      <MastheadTabs
        baseURL={`/@${props.ownerHandle}/${props.characterName}/`}
        items={characterTabs}
      />
    </div>
  )
}
