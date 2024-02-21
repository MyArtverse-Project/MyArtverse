"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Masthead } from "@/components/ui/Masthead"
import {
  LuArrowLeft as ArrowLeft,
  LuBookMarked as BookMarked,
  LuPencil as EditIcon,
  LuHeart as HeartIcon,
  LuHistory as HistoryIcon,
  LuHome as HomeIcon,
  LuLayoutGrid as LayoutGridIcon,
  LuImage
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
  return (
    <Masthead>
      <Masthead.Wrapper>
        <Button
          href={`/@${owner}`}
          prefixIcon={<ArrowLeft className="mr-3" />}
          className="bg-300 hover:bg-400 my-3 flex flex-row items-center rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
        >
          Back to <span className="font-bold">{owner}'s</span> profile
        </Button>
      </Masthead.Wrapper>
      <Masthead.Wrapper>
        <Masthead.Avatar src="/img/examples/ozzy/testing.png" />
        <Masthead.Details>
          <Masthead.Layer spaceBetween>
            <h2 className="not-prose font-inter flex items-center gap-x-1.5 text-3xl font-bold">
              <span>{name}</span>
              <span aria-hidden></span>
            </h2>
            <div className="relative z-[6] flex items-start gap-x-2.5">
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
          </Masthead.Layer>
          <Masthead.Layer>
            <span className="text-700 font-semibold">{species}</span>
            <span className="text-700">{pronouns}</span>
          </Masthead.Layer>
          <Masthead.Layer>
            <span className="text-700">Created by {creator}</span>
          </Masthead.Layer>
        </Masthead.Details>
      </Masthead.Wrapper>
      <Masthead.Tabs
        baseURL={`/@${handle}/character/${character}`}
        items={[
          {
            icon: HomeIcon,
            text: "Overview",
            link: `/`
          },
          {
            icon: LuImage,
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
    </Masthead>
  )
}
