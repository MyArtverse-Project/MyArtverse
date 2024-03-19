"use client"

import { Button } from "@/components/ui/Buttons"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import { Masthead } from "@/components/ui/Masthead"
import type { IconType } from "react-icons"
import {
  LuBrush as BrushIcon,
  LuCat as CatIcon,
  LuHeart as HeartIcon,
  LuHome as HomeIcon,
  LuImage,
  LuMoreVertical as MoreVerticalIcon,
  LuUserPlus as UserPlusIcon
} from "react-icons/lu"
import type { UserRoles, UserType } from "@/types/users"

// TODO: Remove all props to be retrieved directly from Jotai or react-query
export default function ProfileMasthead({
  profileData,
  hasEditAccess
}: {
  username?: string
  profileData: UserType
  badges?: UserRoles
  /** Only for logged in users that should be set to `true` */
  hasEditAccess?: boolean
  /** If the user has explicitly set profile to "NSFW" */
  isNsfw?: boolean
  followsYou?: boolean
  followerCount?: number
  followingCount?: number
  socials?: {
    link: string
    icon: IconType
  }[]
}) {
  const name = profileData.displayName ? profileData.displayName : profileData.handle
  const profileTabs = [
    {
      icon: HomeIcon,
      text: "Overview",
      link: ""
    },
    {
      icon: CatIcon,
      text: "Characters",
      link: "/characters",
      countIndicator: profileData.characters ? profileData.characters.length : 0
    },
    {
      icon: BrushIcon,
      text: "Listings",
      link: "/listings"
    },
    {
      icon: LuImage,
      text: "Gallery",
      link: "/gallery"
    },
    {
      icon: HeartIcon,
      text: "Favorites",
      link: "/favorites",
      countIndicator: 69
    }
  ]

  return (
    <Masthead hasEditAccess={hasEditAccess}>
      <Masthead.Banner src={profileData.bannerUrl || null} />
      <Masthead.Wrapper>
        <Masthead.Avatar profileOnly src={profileData.avatarUrl || null} />
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <div
              className="not-prose font-inter mt-4 flex items-center gap-x-1.5 text-3xl font-bold"
              translate="no"
            >
              <div>{name}</div>
              <span aria-hidden>{/* badges */}</span>
            </div>
            <div className="relative z-[6] mt-4 flex items-start gap-x-2.5">
              <Button
                prefixIcon={<BrushIcon size={20} />}
                aria-label={`View ${name}'s Commissions`}
                variant="secondary"
              >
                View Commission ToS
              </Button>
              <Button
                prefixIcon={<UserPlusIcon size={20} />}
                aria-label={`Follow ${name}`}
              >
                Follow
              </Button>
              <Dropdown
                button={
                  <Button icon={<MoreVerticalIcon size={20} />} aria-label="More" />
                }
                items={
                  <>
                    <DropdownItem link="/">Share</DropdownItem>
                    <DropdownItem link="/">Manage trades</DropdownItem>
                    <DropdownItem link="/">
                      Report <span translate="no">{name}</span>
                    </DropdownItem>
                    <DropdownItem link="/">
                      Block <span translate="no">{name}</span>
                    </DropdownItem>
                  </>
                }
              />
            </div>
          </Masthead.Layer>
          {/* TODO: Figure out mutuals through backend */}
          {/* <Masthead.Layer>following</Masthead.Layer> */}
          {/* TODO: Figure out links through backend */}
          {/* <Masthead.Layer>{profileData.links}</Masthead.Layer> */}
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs baseURL={`/@${profileData.handle}`} items={profileTabs} />
    </Masthead>
  )
}
