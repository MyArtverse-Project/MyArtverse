"use client"

import type { ReferenceSheet } from "@/types/characters"
import { BACKEND_URL } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import { resolveArtistCredit } from "@mav/shared"
import NsfwMedia from "@/components/NsfwMedia"

interface ReferenceCardProps {
  data: ReferenceSheet
  toggleUploadRefSheetModal: () => void
  setEditingData: (data: ReferenceSheet) => void
}

export function ReferenceCard({
  data,
  toggleUploadRefSheetModal,
  setEditingData,
}: ReferenceCardProps) {
  const mainVariant =
    data.variants.find((v) => v.main) ?? data.variants[0]
  const artistCredit = resolveArtistCredit(data)

  const clickables = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()

    if (e.shiftKey) {
      fetch(`${BACKEND_URL}/v1/character/assign-ref/${data.id}`, {
        method: "PUT",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data)
    } else {
      setEditingData(data)
      toggleUploadRefSheetModal()
    }
  }

  return (
    <div
      className={cn(
        "mt-4 flex w-full flex-row space-y-3 rounded-lg",
        data.active && "bg-muted"
      )}
      onClick={clickables}
    >
      <div className="relative h-36 w-40 shrink-0 overflow-hidden rounded-l-lg">
        <NsfwMedia
          src={mainVariant?.url || ""}
          alt={mainVariant?.name || ""}
          nsfw={!!mainVariant?.nsfw}
          fill
          editable
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl">{data.name}</h2>
        <span className="text-sm">
          {artistCredit ? artistCredit.label : "No artist credited"}
        </span>
        <span className="text-sm">
          Contains {data.variants.length} variant(s)
        </span>
      </div>
    </div>
  )
}
