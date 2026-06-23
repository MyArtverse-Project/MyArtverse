"use client"

import RelationModal from "@/components/Modals/RelationsModal"
import {
  MastheadAvatar,
  MastheadBanner,
  MastheadDetails,
  MastheadLayer,
  MastheadWrapper
} from "@/components/layouts/Mastheads/MastheadParts"
import {
  MastheadTabs,
  type MastheadTabItem
} from "@/components/layouts/Mastheads/MastheadTabs"
import { Button } from "@/components/ui/button"
import { MastheadScrollTitle } from "@/components/layouts/Mastheads/MastheadScrollTitle"
import Link from "next/link"
import { useState } from "react"
import { LuCat, LuGalleryThumbnails, LuHeart, LuHome } from "react-icons/lu"
import { Masthead } from "@mav/ui/components/layouts"

interface ProfileMastheadProps {
  handle: string
  displayName: string
  bannerUrl: string
  avatarUrl: string
  profileBio: string
  followerCount: number
  characterCount: number
  followingCount: number
  isOwnProfile?: boolean
}

const generateProfileTabs = (characterCount: number = 0) =>
  [
    {
      icon: LuHome,
      text: "Overview",
      link: ""
    },
    {
      icon: LuCat,
      text: "Characters",
      link: "characters",
      countIndicator: characterCount
    },
    {
      icon: LuGalleryThumbnails,
      text: "Gallery",
      link: "gallery"
    },
    {
      icon: LuHeart,
      text: "Favorites",
      link: "favorites"
    }
  ] satisfies MastheadTabItem[]

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  const [displayRelationsModal, setDisplayRelationsModal] = useState(false)
  const toggleRelationsModal = (type?: string) => {
    setStartingRelationTab(type || "follower")
    setDisplayRelationsModal(!displayRelationsModal)
  }

  const [startingRelationTab, setStartingRelationTab] = useState("follower")

  return (
    <Masthead>
      <MastheadBanner src={props.bannerUrl} />
      <MastheadWrapper>
        <MastheadAvatar
          src={props.avatarUrl}
          alt={props.displayName || props.handle || "User"}
          fallback={(props.displayName || props.handle)?.charAt(0).toUpperCase()}
          onBanner={props.bannerUrl != null}
        />
        <MastheadDetails>
          <MastheadLayer spaceBetween>
            <MastheadScrollTitle
              scrollTitle={{
                kind: "profile",
                href: props.handle ? `/@${props.handle}` : "/",
                label: props.displayName || props.handle || "Profile",
                primary: props.displayName || props.handle || "",
                secondary: props.handle ? `@${props.handle}` : undefined,
                avatarUrl: props.avatarUrl
              }}
              className="text-4xl font-semibold"
            >
              {props.displayName || props.handle}
            </MastheadScrollTitle>
            {props.isOwnProfile ? (
              <Button asChild>
                <Link href="/settings/profile">Edit Profile</Link>
              </Button>
            ) : null}
          </MastheadLayer>
          <MastheadLayer>
            <div className="text-muted-foreground flex gap-x-4 text-lg">
              <span>{props.handle ? `@${props.handle}` : ""}</span>
              <button
                type="button"
                className="hover:text-foreground transition-colors"
                onClick={() => toggleRelationsModal("followers")}
              >
                {props.followerCount} followers
              </button>
              <button
                type="button"
                className="hover:text-foreground transition-colors"
                onClick={() => toggleRelationsModal("following")}
              >
                {props.followingCount} following
              </button>
            </div>
          </MastheadLayer>
          <MastheadLayer>{props.profileBio}</MastheadLayer>
        </MastheadDetails>
      </MastheadWrapper>
      <MastheadTabs
        baseURL={`/@${props.handle}/`}
        items={generateProfileTabs(props.characterCount)}
      />
      <RelationModal
        followers={[]}
        following={[]}
        displayRelationsModal={displayRelationsModal}
        toggleRelationsModal={toggleRelationsModal}
        startingTab={startingRelationTab}
      />
    </Masthead>
  )
}
