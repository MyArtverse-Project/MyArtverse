"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { MFImage, SocialsRow, Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import { useDetailPeekContext } from "@/context"
import {
  LuAlertTriangle as AlertTriangleIcon,
  LuBrush as BrushIcon,
  LuCat as CatIcon,
  LuHeart as HeartIcon,
  LuHome as HomeIcon,
  LuLayoutGrid as LayoutGridIcon,
  LuMoreVertical as MoreVerticalIcon,
  LuUserPlus as UserPlusIcon
} from "react-icons/lu"

// TODO rewrite this masthead function to be reusable for profiles and character pages
export default function ProfileMasthead({
  handle,
  username,
  isFollowingUser,
  followers,
  following,
  characterCount,
  hasCommissions,
  isNSFW
}: {
  type?: "profile" | "character"
  handle: string
  username?: string
  isFollowingUser?: boolean
  followers?: number
  following?: number
  characterCount?: number
  hasCommissions?: boolean
  isNSFW?: boolean
}) {
  const { setPeek, setPeeking } = useDetailPeekContext()

  const profileDetailsRef = useRef<HTMLDivElement>(null)

  const [modalState, setModalState] = useState(false)

  const toggleModal = () => {
    setModalState(!modalState)
    return
  }

  useEffect(() => {
    setPeek.img("/img/examples/ozzy/5.png")
    setPeek.type("profile")
    setPeek.username(handle)
  }, [setPeek, handle])

  useEffect(() => {
    const profileDetails = profileDetailsRef.current

    const io = new IntersectionObserver(
      ([entry]) => {
        setPeeking(entry.isIntersecting)
      },
      { rootMargin: "-7% 0%" }
    )

    io.observe(profileDetails)
  }, [setPeeking])

  return (
    <div className="contents">
      {/* Banner */}
      {/* <div
          className="absolute inset-0 grid place-items-center z-[4]"
        >
          <span>Change banner</span>
        </div> */}
      <MFImage
        aspectRatio="15/3"
        width="100vw"
        objectFit="cover"
        src="/img/hero/ozzy-banner.png"
        strategy="important"
        style={{
          objectPosition: "0 calc(50% * 1))"
        }}
      />
      <div ref={profileDetailsRef} className="mx-auto max-w-screen-2xl px-12">
        <section className="flex h-fit gap-x-2.5">
          {/* Avatar */}
          <div className="relative h-[calc(var(--avatar-size)/1.25)] w-[var(--avatar-size)] flex-shrink-0">
            <div className="absolute inset-0 -top-12 z-[3]" />
            <div className="border-100 bg-100 absolute -top-12 aspect-square w-[var(--avatar-size)] overflow-hidden rounded-full border-4">
              <Image
                fill
                priority
                loading="eager"
                src="/img/examples/ozzy/5.png"
                alt={`Avatar of Username`}
                sizes="(min-width: 1200px) 800px"
                className="object-cover"
                draggable="false"
              />
            </div>
          </div>
          {/* Username details */}
          <div className="flex w-full flex-col gap-y-2 pt-4">
            {/* layer 1 - username */}
            <div className="flex justify-between">
              <h2 className="not-prose font-inter flex items-center gap-x-1.5 text-3xl font-bold">
                <span>Username</span>
                <span aria-hidden></span>
              </h2>
              <div className="relative z-[6] flex items-start gap-x-2.5">
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
            </div>
            {/* layer 2 - handles and followers */}
            <div className="flex gap-x-3.5">
              <span className="text-700 font-semibold">@{handle}</span>
              <span className="bg-error inline-flex items-center gap-x-1 rounded-md px-1 text-xs font-semibold">
                <AlertTriangleIcon size={17} />
                <span>NSFW</span>
              </span>
              <span className="text-700">69 followers</span>
              <span className="text-700">21 following</span>
            </div>
            {/* layer 3 - socials */}
            <div className="flex gap-x-2.5 pt-1.5">
              <SocialsRow items={[{ platform: "Website", link: "baby" }]} />
            </div>
          </div>
        </section>
      </div>
      <div className="bg-100 sticky top-[3.75rem] z-[3] overflow-x-auto">
        <div className="mx-auto max-w-screen-2xl px-9">
          <Tabs
            baseURL={`/@${handle}`}
            items={[
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
                icon: LayoutGridIcon,
                text: "Gallery",
                link: "/gallery"
              },
              {
                icon: HeartIcon,
                text: "Favorites",
                link: "/favorites",
                countIndicator: 69
              }
            ]}
          />
        </div>
        <div
          className="border-b-separator relative -z-[1] w-full border-0 border-b-2 border-opacity-50"
          aria-hidden
        ></div>
      </div>
    </div>
  )
}
