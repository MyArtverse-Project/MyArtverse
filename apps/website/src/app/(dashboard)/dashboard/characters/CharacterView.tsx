"use client"

import dynamic from "next/dynamic"
import { CharacterItemSkeleton, CharacterTable } from "@/components/dashboard/Tables"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { LuFilter } from "react-icons/lu"

const CharacterTableItem = dynamic(
  () => import("@/components/dashboard/Tables").then((c) => c.CharacterItem),
  { ssr: false, loading: CharacterItemSkeleton }
)

export default function CharacterView() {
  return (
    <div className="w-full">
      <div className="after:border-mute relative flex items-center px-2 after:absolute after:inset-x-0 after:bottom-0 after:z-[3] after:h-[1px] after:border-b">
        <Button
          variant="tritery"
          className="group absolute inset-y-1 left-3 z-[2] px-2.5 hover:bg-transparent"
        >
          <LuFilter size={19} className="group-hover:stroke-500" />
        </Button>
        <InputField
          noLabel
          placeholder="Filter characters"
          className="font-inter relative w-full rounded-none border-none py-3 pl-12 text-sm focus:outline-none focus:ring-0"
        />
      </div>
      <div className="w-full">
        <CharacterTable>
          <CharacterTableItem />
          <CharacterTableItem />
          <CharacterTableItem />
          <CharacterTableItem />
        </CharacterTable>
      </div>
    </div>
  )
}
