import DropZone from "@/components/Modals/DropZone"
import { useState } from "react"
import { ReferenceConfigForm } from "./ReferenceConfigForm"
import { Character } from "@/types/characters"
import { Button } from "@mav/ui/components/buttons"
import { LuArrowLeft } from "react-icons/lu"
import { createRefSheet } from "@/utils/api"
import { cn } from "@mav/shared/utils"

type RefModalStep = "drop" | "config"

export default function RefSheetModal({ isOpen, onClose, character }: { isOpen: boolean, onClose: () => void, character: Character }) {
  const [step, setStep] = useState<RefModalStep>("drop")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (url: string) => {
    setUploadedImage(url)
    console.log(url)
    setStep("config")
  }

  const handleClose = async (formData: any) => {
    await createRefSheet(formData)
    onClose()
  }

  return (
    <div className={cn("fixed inset-0 bg-200 bg-opacity-50 z-50 transition-all", "overflow-y-auto", isOpen ? "visible" : "invisible")}>
      <div className={cn("absolute right-0 top-0 h-full w-full sm:w-3/5 bg-100 bg-opacity-100 shadow-2xl transition-transform duration-300", isOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="flex w-full items-center justify-between p-6">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <Button
              size="small"
              variant="tritery"
              icon={<LuArrowLeft size={18} />}
              onClick={onClose}
            />
            New Reference Sheet
          </span>
        </div>
        {step === "drop" ? (
            <DropZone
              value={uploadedImage}
              setData={handleImageUpload}
              className="w-full max-h-64 m-6 max-w-full border-dashed border-2 border-gray-400 rounded-lg"
            />
        ) : (
          <ReferenceConfigForm image={uploadedImage!} character={character} onClose={handleClose} />
        )}
      </div>
    </div>
  )
}
