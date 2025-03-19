"use client"

import Image from "next/image"
import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import { LuCat, LuHeart, LuHome } from "react-icons/lu"

interface ProfileMastheadProps {
  handle: string
  displayName: string
  bannerUrl: string
  avatarUrl: string
  profileBio: string
  followerCount: number
  followingCount: number
}

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  const profileTabs: MastheadTabItems = [
    {
      icon: LuHome,
      text: "Overview",
      link: "",
    },
    {
      icon: LuCat,
      text: "Characters",
      link: "characters",
      countIndicator: 5,
    },
    {
      icon: LuHeart,
      text: "Favorites",
      link: "favorites",
    },
  ]

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
          <Masthead.Layer>
            <span className="text-4xl">{props.displayName || props.handle}</span>
          </Masthead.Layer>
          <Masthead.Layer className="gap-x-4 flex flex-row">
            <span className="text-lg">{props.handle ? `@${props.handle}` : ""}</span>
            <span className="text-lg">{props.followerCount || "???"} followers</span>
            <span className="text-lg">{props.followingCount || "???"} following</span>
          </Masthead.Layer>
          <Masthead.Layer></Masthead.Layer>
          <Masthead.Layer>{props.profileBio}</Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs items={profileTabs} />
    </Masthead>
  )
}
