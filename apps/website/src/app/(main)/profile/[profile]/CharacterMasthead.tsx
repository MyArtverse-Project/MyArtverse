"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { useDetailPeekContext } from "@/context"
import {
  LuArrowLeft as ArrowLeft,
  LuBookMarked as BookMarked,
  LuPencil as EditIcon,
  LuHeart as HeartIcon,
  LuHistory as HistoryIcon,
  LuHome as HomeIcon,
  LuLayoutGrid as LayoutGridIcon
} from "react-icons/lu"

export default function CharacterMasthead({
  handle,
  character,
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
  character: string
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

  const profileDetailsRef = useRef<React.ElementRef<"div">>(null)

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
      <div ref={profileDetailsRef} className="mx-auto max-w-screen-2xl px-12">
        <Button
          href={`/@${owner}`}
          prefixIcon={<ArrowLeft className="mr-3" />}
          className="bg-300 hover:bg-400 my-8 mb-4 flex flex-row items-center rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
        >
          Back to <span className="font-bold">{owner}'s</span> profile
        </Button>
        <section className="flex h-fit gap-x-2.5">
          {/* Avatar */}
          <div className="relative h-[calc(var(--avatar-size)/1)] w-[var(--avatar-size)] flex-shrink-0">
            <div className="absolute inset-0 z-[3] " />
            <div className="border-100 bg-100  absolute aspect-square w-[var(--avatar-size)] overflow-hidden rounded-xl border-4">
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
          <div className="flex w-full flex-col gap-y-2 pt-4">
            {/* layer 1 - username */}
            <div className="flex justify-between">
              <h2 className="not-prose font-inter flex items-center gap-x-1.5 text-3xl font-bold">
                <span>{name}</span>
                <span aria-hidden>
                  {/* <Badge
                    label="Visible to followers"
                    varient="default"
                    prefixIcon={<LockIcon size={17} />}
                  /> */}
                </span>
              </h2>
              <div className="z-2 relative flex items-start gap-x-2.5">
                <Button prefixIcon={<EditIcon size={20} />} aria-label="Follow Username">
                  Edit Profile
                </Button>
                <Button
                  prefixIcon={<HeartIcon size={20} />}
                  aria-label="Favorite"
                  count={3}
                >
                  Favorite
                </Button>
              </div>
            </div>
            {/* layer 2 - handles and followers */}
            <div className="flex gap-x-3.5">
              <span className="text-700 font-semibold">{species}</span>
              <span className="text-700">{pronouns}</span>
            </div>
            {/* layer 3 - Fursona Info */}
            <div className="flex gap-x-2.5 pt-1.5">
              <span className="text-700">Created by {creator}</span>
            </div>
            {/* layer 3 - Toyhouse/Notices */}
            <div className="flex gap-x-2.5 pt-1.5">
              {/* TODO: Temporary */}
              {/* <span className="text-700">
                {toyhouseLink && (
                  <span className="flex flex-row items-center">
                    <InfoIcon size={16} className="mr-2" /> This character has
                    been migrated from  <Link href={{
                      href: toyhouseLink,
                    }}>Toyhouse</Link>
                  </span>
                )}
              </span> */}
            </div>
          </div>
        </section>
      </div>
      <div className="bg-100 sticky top-[3.75rem] z-[3] overflow-x-auto">
        <div className="mx-auto max-w-screen-2xl px-9">
          <Tabs
            baseURL={`/@${handle}/character/${character}`}
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
          className="border-b-separator relative -z-[1] w-full border-0 border-b-2 border-opacity-50"
          aria-hidden
        ></div>
      </div>
    </div>
  )
}
