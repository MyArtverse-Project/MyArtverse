import { MFImage } from "@/components/ui"
import type { ReferenceSheet } from "@/types/characters"

export default function ReferenceCard({
  data,
  toggleUploadRefSheetModal,
  setEditingData
}: {
  data: ReferenceSheet
  toggleUploadRefSheetModal: () => void
  setEditingData: (data: ReferenceSheet) => void
}) {
  const editModal = () => {
    setEditingData(data)
    toggleUploadRefSheetModal()
  }

  return (
    <div
      className="bg-400 mt-4 flex w-full flex-row space-y-3 rounded-lg"
      onClick={editModal}
    >
      <MFImage
        src={data.variants.find((v) => v.active)?.url || data.variants[0]?.url || ""}
        alt={data.variants.find((v) => v.active)?.name || data.variants[0]?.name || ""}
        width={250}
        height={150}
        rounded={20}
      />
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl">{data.refSheetName}</h2>
        <span className="text-sm">{data.artist}</span>
        <span className="text-sm">Contains {data.variants.length} variant(s)</span>
      </div>
    </div>
  )
}
