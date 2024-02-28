"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Buttons"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import { Masthead } from "@/components/ui/Masthead"
import type { IconType } from "react-icons"
import {
  LuBrush as BrushIcon,
  LuCat as CatIcon,
  LuHeart as HeartIcon,
  LuHome as HomeIcon,
  LuLayoutGrid as LayoutGridIcon,
  LuImage,
  LuMoreVertical as MoreVerticalIcon,
  LuUserPlus as UserPlusIcon
} from "react-icons/lu"
import type { UserRoles } from "@/types/users"

const fetchUserData = () => {
  console.log("fetching user data")
  const data = fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/profile/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    referrerPolicy: "no-referrer",
    redirect: "follow"
  }).then((res) => res.json())
  return data
}

export default function ProfileMasthead({
  handle,
  hasEditAccess
}: {
  username?: string
  handle: string
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
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  fetchUserData()

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
      countIndicator: 5
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
      <Masthead.Banner />
      <Masthead.Wrapper>
        <Masthead.Avatar profileOnly />
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <h2 className="not-prose font-inter mt-4 flex items-center gap-x-1.5 text-3xl font-bold">
              <span>Username</span>
              <span aria-hidden></span>
            </h2>
            <div className="relative z-[6] mt-4 flex items-start gap-x-2.5">
              <Button
                prefixIcon={<BrushIcon size={20} />}
                aria-label="View Username's Commissions"
                variant="secondary"
              >
                View Commission ToS
              </Button>
              <Button
                prefixIcon={<UserPlusIcon size={20} />}
                aria-label="Follow Username"
              >
                Follow
              </Button>
              <Dropdown
                button={
                  <Button
                    iconOnly
                    prefixIcon={<MoreVerticalIcon size={20} />}
                    aria-label="More"
                  ></Button>
                }
                items={
                  <>
                    <DropdownItem link="/">Share</DropdownItem>
                    <DropdownItem link="/">Manage trades</DropdownItem>
                    <DropdownItem link="/">Report Username</DropdownItem>
                    <DropdownItem link="/">Block Username</DropdownItem>
                  </>
                }
              />
            </div>
          </Masthead.Layer>
          <Masthead.Layer>following</Masthead.Layer>
          <Masthead.Layer>socials</Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs baseURL={`/@${handle}`} items={profileTabs} />
    </Masthead>
  )
}
