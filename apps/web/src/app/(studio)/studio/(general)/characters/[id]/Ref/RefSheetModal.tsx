"use client"

import { useAuth } from "@/app/context/AuthContext"
import DropZone from "@/components/Modals/DropZone"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Character, ReferenceSheet } from "@/types/characters"
import { createRefSheet } from "@/utils/api"
import { useEffect, useState } from "react"
import { LuArrowLeft, LuMoreVertical } from "react-icons/lu"
import {
  ReferenceConfigForm,
} from "./ReferenceConfigForm"
import type { RefSheetFormData } from "./ReferenceConfigForm"
import { getMainVariantImage } from "./refSheetUtils"

type RefModalStep = "drop" | "config"

const REF_SHEET_FORM_ID = "ref-sheet-form"

export default function RefSheetModal({
  isOpen,
  onClose,
  onSaved,
  character,
  mode = "create",
  initialRefSheet,
}: {
  isOpen: boolean
  onClose: () => void
  onSaved?: () => void
  character: Character
  mode?: "create" | "edit"
  initialRefSheet?: ReferenceSheet | null
}) {
  const { user } = useAuth()
  const isEditing = mode === "edit" && !!initialRefSheet
  const [step, setStep] = useState<RefModalStep>(isEditing ? "config" : "drop")
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    isEditing && initialRefSheet ? getMainVariantImage(initialRefSheet) : null
  )
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setStep("drop")
      setUploadedImage(null)
      setIsSaving(false)
      return
    }

    if (mode === "edit" && initialRefSheet) {
      setStep("config")
      setUploadedImage(getMainVariantImage(initialRefSheet))
    } else {
      setStep("drop")
      setUploadedImage(null)
    }
  }, [isOpen, mode, initialRefSheet])

  const handleImageUpload = (url: string) => {
    setUploadedImage(url)
    setStep("config")
  }

  const handleClose = async (formData: RefSheetFormData) => {
    setIsSaving(true)
    try {
      await createRefSheet(formData)
      onSaved?.()
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose()
  }

  const linkedCharacters =
    user?.characters.map((entry) => ({
      id: entry.id,
      name: entry.name,
      avatarUrl: entry.avatarUrl,
      mainCharacter:
        entry.id === character.id ? character.mainCharacter : false,
    })) ?? [
      {
        id: character.id,
        name: character.name,
        avatarUrl: character.avatarUrl,
        mainCharacter: character.mainCharacter,
      },
    ]

  const showConfig = step === "config" && uploadedImage

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="border-border flex w-full max-w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl lg:max-w-4xl [&>button]:hidden"
      >
        <SheetHeader className="border-border shrink-0 space-y-0 border-b px-6 py-4 text-left">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose} type="button">
                <LuArrowLeft size={18} />
              </Button>
              <SheetTitle className="truncate">
                {isEditing ? "Edit reference sheet" : "New reference sheet"}
              </SheetTitle>
            </div>

            {showConfig && (
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="submit"
                  form={REF_SHEET_FORM_ID}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" type="button">
                      <LuMoreVertical size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onClose}>Cancel</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-6 py-6">
          {!showConfig ? (
            <DropZone
              value={uploadedImage}
              setData={handleImageUpload}
              enableCrop={false}
              className="border-border w-full max-w-full border-2 border-dashed"
            />
          ) : (
            <ReferenceConfigForm
              image={uploadedImage}
              character={character}
              characters={linkedCharacters}
              initialRefSheet={initialRefSheet ?? undefined}
              formId={REF_SHEET_FORM_ID}
              onClose={handleClose}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
