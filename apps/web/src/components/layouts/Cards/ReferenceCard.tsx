import type { ReferenceSheet } from "@/types/characters"
import { BACKEND_URL } from "@/utils/constants"
import { cn } from "@mav/shared/utils"
import Image from "next/image"

export default function ReferenceCard({
  data,
  toggleUploadRefSheetModal,
  setEditingData
}: {
  data: ReferenceSheet
  toggleUploadRefSheetModal: () => void
  setEditingData: (data: ReferenceSheet) => void
}) {
  const clickables = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    if (e.shiftKey) {
      fetch(`${BACKEND_URL}/v1/character/assign-ref/${data.id}`, {
        method: "PUT",
        credentials: "include"
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
        data.active && "bg-400"
      )}
      onClick={clickables}
    >
      <Image
        src={data.variants.find((v) => v.main)?.url || data.variants[0]?.url || ""}
        alt={data.variants.find((v) => v.main)?.name || data.variants[0]?.name || ""}
        width={250}
        height={150}
        className="h-36 w-40 rounded-l-lg object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl">{data.refSheetName}</h2>
        <span className="text-sm">{data.artist}</span>
        <span className="text-sm">Contains {data.variants.length} variant(s)</span>
      </div>
    </div>
  )
}
