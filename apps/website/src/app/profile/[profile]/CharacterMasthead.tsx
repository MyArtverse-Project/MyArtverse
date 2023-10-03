"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/Buttons"
import {
  ArrowLeft,
  BookMarked,
  EditIcon,
  HeartIcon,
  HistoryIcon,
  HomeIcon,
  InfoIcon,
  LayoutGridIcon,
  LockIcon
} from "lucide-react"
import {Badge} from '@/../../../packages/ui'
import { Tabs } from "@/components/ui"
import { useDetailPeekContext } from "@/context"

export default function CharacterMasthead({
  handle,
  name,
  species,
  pronouns,
  owner,
  creator,
  toyhouseLink,
  status,
  favoriteCount = 0
}: {
  handle: string
  name: string
  species: string
  pronouns: string
  owner: string
  creator: string
  toyhouseLink: string
  status: "Owned" | "Up For Adoption" | "Hidden" | "Adopted"
  favoriteCount?: number
}) {
  const { setPeek, setPeeking } = useDetailPeekContext()

  const profileDetailsRef = useRef<HTMLDivElement>(null)

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
    <div id="masthead-root" className="contents">
      <div ref={profileDetailsRef} className="px-12 mx-auto max-w-screen-2xl">
        <Button
          prefixIcon={<ArrowLeft className="mr-3" />}
          className="mb-4 my-8 flex flex-row items-center "
        >
          Back to {owner}'s profile
        </Button>
        <section className="flex gap-x-2.5 h-fit">
          {/* Avatar */}
          <div className="relative flex-shrink-0 w-[var(--avatar-size)] h-[calc(var(--avatar-size)/1)]">
            <div className="absolute inset-0 z-[3] " />
            <div className="w-[var(--avatar-size)] absolute  aspect-square overflow-hidden border-4 rounded-xl border-100 bg-100">
              <Image
                fill
                priority
                loading="eager"
                src="/img/examples/ozzy/testing.png"
                alt={`Avatar of Username`}
                sizes="(min-width: 1200px) 800px"
                className="object-cover"
                draggable="false"
              />
            </div>
          </div>
          {/* Username details */}
          <div className="flex flex-col w-full pt-4 gap-y-2">
            {/* layer 1 - username */}
            <div className="flex justify-between">
              <h2 className="text-3xl not-prose font-inter font-bold flex items-center gap-x-1.5">
                <span>{name}</span>
                <span id="badge-shelf" aria-hidden>
                  <Badge
                    label="Visible to followers"
                    varient="default"
                    prefixIcon={<LockIcon size={17} />}
                  />
                </span>
              </h2>
              <div className="flex items-start gap-x-2.5 relative z-2">
                <Button
                  prefixIcon={<EditIcon size={20} />}
                  aria-label="Follow Username"
                >
                  Edit Profile
                </Button>
                <Button
                  prefixIcon={<HeartIcon size={20} />}
                  aria-label="Favorite"
                >
                  Favorite
                  {favoriteCount && (
                    <span
                      aria-hidden
                      className="text-xs px-2 py-3 group-hover:bg-opacity-100 bg-100 text-700 mx-4 rounded-2xl"
                    >
                      {favoriteCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
            {/* layer 2 - handles and followers */}
            <div className="flex gap-x-3.5">
              <span id="user-handle" className="font-semibold text-700">
                {species}
              </span>

              <span id="user-followers" className="text-700">
                {pronouns}
              </span>
            </div>
            {/* layer 3 - Fursona Info */}
            <div className="flex gap-x-2.5 pt-1.5">
              <span id="user-followers" className="text-700">
                Created by {creator}
              </span>
            </div>
            {/* layer 3 - Toyhouse/Notices */}
            <div className="flex gap-x-2.5 pt-1.5">
              <span id="user-followers" className="text-700">
                {toyhouseLink && (
                  <span className="flex flex-row items-center">
                    <InfoIcon size={16} className="mr-2" /> This character has
                    been migrated from <Link href={toyhouseLink}>Toyhouse</Link>
                  </span>
                )}
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-[3.75rem] z-[3] bg-100 overflow-x-auto">
        <div className="max-w-screen-2xl mx-auto px-9">
          <Tabs
            baseURL={`/@${handle}`}
            items={[
              {
                icon: HomeIcon,
                text: "Overview",
                link: `/`
              },
              {
                icon: LayoutGridIcon,
                text: "Gallery",
                link: `/gallery`
              },
              {
                icon: BookMarked,
                text: "Biography",
                link: `/biography`
              },
              {
                icon: HistoryIcon,
                text: "Activity",
                link: `/activity`
              }
            ]}
          />
        </div>
        <div
          className="relative -z-[1] w-full border-b-2 border-0 border-b-separator border-opacity-50"
          aria-hidden
        ></div>
      </div>
    </div>
  )
}
