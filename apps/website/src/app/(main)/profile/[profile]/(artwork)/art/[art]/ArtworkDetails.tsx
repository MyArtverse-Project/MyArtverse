"use client"

import { Avatar, Button } from "@/components/ui/Buttons"
import { LuMoreVertical, LuShare, LuStar } from "react-icons/lu"

export default function ArtworkDetails({
  artTitle = "Title placeholder",
  artist = "Artist placeholder",
  artistImg
}: Partial<
  Readonly<{
    artTitle: string
    artist: string
    artistImg: string
    handle: string
  }>
>) {
  return (
    <>
      <div className="flex gap-x-2.5">
        {/* Artist avatar */}
        <span className="flex-shrink-0">
          <Avatar
            username={artist}
            size={56}
            src={artistImg ?? "/img/examples/kuro/kuro-example2.png"}
          />
        </span>
        <div className="flex w-full flex-col">
          {/* Titles and stuff */}
          <div className="flex justify-between">
            <h2 className="mb-0.5 text-3xl">{artTitle}</h2>
            <div className="flex items-start gap-x-1.5">
              <Button
                aria-label="Favorite {title}, along with 1 thousand and 4 hundred people"
                prefixIcon={<LuStar size={21} />}
              >
                1.4k
              </Button>
              <Button aria-label="Share" icon={<LuShare size={21} />} />
              <Button aria-label="More" icon={<LuMoreVertical size={21} />} />
            </div>
          </div>
          {/* Artist info */}
          <div className="flex flex-wrap items-center gap-x-1">
            <span className="opacity-60">by</span>
            <span>{artist}</span>
            <Button size="small">Follow</Button>
            <span className="ml-2">Published 2 hours ago</span>
          </div>
        </div>
      </div>
      {/* Art description */}
      <div className="border-300 mt-5 rounded-md border-[2px] px-5 py-3.5 transition-colors duration-150">
        description
      </div>
    </>
  )
}
