"use client"

import RelationModal from "@/components/Modals/RelationsModal"
import { Button } from "@mav/ui/components/buttons"
import { Masthead, type MastheadTabItems } from "@mav/ui/components/layouts"
import { useState } from "react"
import { LuCat, LuHeart, LuHome } from "react-icons/lu"

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

const generateProfileTabs = (characterCount: number = 0) => [
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
    icon: LuHeart,
    text: "Favorites",
    link: "favorites"
  }
] satisfies MastheadTabItems

export function ProfileMasthead(props: Partial<ProfileMastheadProps>) {
  const [displayRelationsModal, setDisplayRelationsModal] = useState(false)
  const toggleRelationsModal = (type?: string) => {
    setStartingRelationTab(type || "follower")
    setDisplayRelationsModal(!displayRelationsModal)
  }

  const [startingRelationTab, setStartingRelationTab] = useState("follower")
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
            {props.isOwnProfile ? (
              <>
                <Button href="/settings/profile">Edit Profile</Button>
              </>
            ) : null}
          </Masthead.Layer>
          <Masthead.Layer>
            <div className="flex gap-x-4">
              <span className="text-lg">
                {props.handle ? `@${props.handle}` : ""}
              </span>
              <span
                className="text-lg"
                onClick={() => toggleRelationsModal("followers")}
              >
                {props.followerCount} followers
              </span>
              <span
                className="text-lg"
                onClick={() => toggleRelationsModal("following")}
              >
                {props.followingCount} following
              </span>
            </div>
          </Masthead.Layer>
          <Masthead.Layer>{props.profileBio}</Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs baseURL={`/@${props.handle}/`} items={generateProfileTabs(props.characterCount)} />
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