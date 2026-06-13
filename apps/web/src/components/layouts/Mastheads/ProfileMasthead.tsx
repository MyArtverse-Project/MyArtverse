"use client"

import RelationModal from "@/components/Modals/RelationsModal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { LuCat, LuHeart, LuHome } from "react-icons/lu"
import {
  MastheadAvatar,
  MastheadBanner,
  MastheadDetails,
  MastheadLayer,
  MastheadWrapper
} from "./MastheadParts"
import { MastheadTabs, type MastheadTabItem } from "./MastheadTabs"

interface ProfileMastheadProps {
  handle: string
  displayName: string
  bannerUrl: string
  avatarUrl: string
  profileBio: string
  followerCount: number
  followingCount: number
  isOwnProfile?: boolean
}

const profileTabs: MastheadTabItem[] = [
  { icon: LuHome, text: "Overview", link: "" },
  { icon: LuCat, text: "Characters", link: "characters", countIndicator: 5 },
  { icon: LuHeart, text: "Favorites", link: "favorites" }
]

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  const [displayRelationsModal, setDisplayRelationsModal] = useState(false)
  const [startingRelationTab, setStartingRelationTab] = useState("follower")

  const toggleRelationsModal = (type?: string) => {
    setStartingRelationTab(type || "follower")
    setDisplayRelationsModal(!displayRelationsModal)
  }

  return (
    <div>
      <MastheadBanner src={props.bannerUrl} />
      <MastheadWrapper>
        <MastheadAvatar
          src={props.avatarUrl}
          alt={props.displayName || props.handle || "Profile"}
          rounded="full"
          onBanner
        />
        <MastheadDetails>
          <MastheadLayer spaceBetween>
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              {props.displayName || props.handle}
            </h1>
            {props.isOwnProfile && (
              <Button variant="secondary" asChild>
                <Link href="/settings/profile">Edit Profile</Link>
              </Button>
            )}
          </MastheadLayer>
          <MastheadLayer>
            <span className="text-muted-foreground text-lg">
              {props.handle ? `@${props.handle}` : ""}
            </span>
            <button
              type="button"
              onClick={() => toggleRelationsModal("followers")}
              className="hover:text-foreground text-muted-foreground text-lg transition-colors"
            >
              <span className="text-foreground font-semibold">
                {props.followerCount ?? 0}
              </span>{" "}
              followers
            </button>
            <button
              type="button"
              onClick={() => toggleRelationsModal("following")}
              className="hover:text-foreground text-muted-foreground text-lg transition-colors"
            >
              <span className="text-foreground font-semibold">
                {props.followingCount ?? 0}
              </span>{" "}
              following
            </button>
          </MastheadLayer>
          {props.profileBio && (
            <MastheadLayer>
              <p className="text-muted-foreground">{props.profileBio}</p>
            </MastheadLayer>
          )}
        </MastheadDetails>
      </MastheadWrapper>
      <MastheadTabs baseURL={`/@${props.handle}/`} items={profileTabs} />
      <RelationModal
        followers={[]}
        following={[]}
        displayRelationsModal={displayRelationsModal}
        toggleRelationsModal={toggleRelationsModal}
        startingTab={startingRelationTab}
      />
    </div>
  )
}
