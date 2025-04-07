"use client"

import { Button } from "@mav/ui/components/buttons"
import { useState } from "react"
import {
  LuCat,
  LuGalleryThumbnails,
  LuListOrdered,
  LuScan,
  LuUser
} from "react-icons/lu"

export default function Search() {
  // const [sortingMode, setSortingMode] = useState("Best Matched")
  const [searchType, setSearchType] = useState("all")
  return (
    <div className="mx-auto max-w-screen-3xl py-6 px-8 flex flex-row gap-x-8">
      <div className="w-1/4 flex flex-col gap-y-3">
        <span className="text-2xl">Filters</span>
        <div className="gap-y-3 flex flex-col text-base">
          <Button
            onClick={() => setSearchType("all")}
            variant={searchType === "all" ? "primary" : "secondary"}
            icon={<LuScan size={18} />}
          >
            All
          </Button>
          <Button
            onClick={() => setSearchType("users")}
            variant={searchType === "users" ? "primary" : "secondary"}
            icon={<LuUser size={18} />}
          >
            Users & Artist
          </Button>
          <Button
            onClick={() => setSearchType("artworks")}
            variant={searchType === "artworks" ? "primary" : "secondary"}
            icon={<LuGalleryThumbnails size={18} />}
          >
            Artworks
          </Button>
          <Button
            onClick={() => setSearchType("listings")}
            variant={searchType === "listings" ? "primary" : "secondary"}
            icon={<LuListOrdered size={18} />}
          >
            Listing
          </Button>
          <Button
            onClick={() => setSearchType("adopts")}
            variant={searchType === "adopts" ? "primary" : "secondary"}
            icon={<LuCat size={18} />}
          >
            Adopts
          </Button>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <span className="text-2xl">621 results</span>
          <div className="flex flex-row gap-x-2">
            {/* <Button variant="primary" icon={<LuArrowDownAZ size={18} />}>Sort by: {sortingMode}</Button>
            <MoreButton></MoreButton> */}
          </div>
        </div>
      </div>
    </div>
  )
}
