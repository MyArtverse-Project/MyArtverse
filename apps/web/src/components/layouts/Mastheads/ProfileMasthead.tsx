"use client"

import Image from "next/image"
import { Button } from "@mav/ui/components/buttons"
import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import { LuCat, LuFileEdit, LuHeart, LuHome } from "react-icons/lu"

interface ProfileMastheadProps {
  handle: string
  displayName: string
  bannerUrl: string
  avatarUrl: string
  profileBio: string
  followerCount: number
  followingCount: number
}

const profileTabs = [
  {
    icon: LuHome,
    text: "Overview",
    link: ""
  },
  {
    icon: LuCat,
    text: "Characters",
    link: "characters",
    countIndicator: 5
  },
  {
    icon: LuHeart,
    text: "Favorites",
    link: "favorites"
  }
] satisfies MastheadTabItems

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  return (
    <Masthead>
      <Masthead.Banner src={props.bannerUrl} />
      <Masthead.Wrapper>
        <Masthead.Avatar
          src={props.avatarUrl}
          profileOnly
          banner={props.bannerUrl != null}
        />
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <span className="text-4xl">
              {props.displayName || props.handle}
            </span>
            <Button href="/settings/profile" icon={<LuFileEdit size={18} />}>
              Edit Profile
            </Button>
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="flex gap-x-4">
              <span className="text-lg">
                {props.handle ? `@${props.handle}` : ""}
              </span>
              <span className="text-lg">
                {props.followerCount || "???"} followers
              </span>
              <span className="text-lg">
                {props.followingCount || "???"} following
              </span>
            </div>
          </Masthead.Layer>
          <Masthead.Layer>{props.profileBio}</Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs baseURL={`/@${props.handle}/`} items={profileTabs} />
    </Masthead>
  )
}
