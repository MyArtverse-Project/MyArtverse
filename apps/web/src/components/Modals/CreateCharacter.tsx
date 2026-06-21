"use client"

import { createCharacter } from "@/utils/api"
import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { LuCat, LuGlobe, LuLock, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"
import DropZone from "./DropZone"

const visibilityOptions = [
  {
    value: "public" as const,
    label: "Public",
    description: "Visible to everyone",
    icon: LuGlobe,
  },
  {
    value: "private" as const,
    label: "Private",
    description: "Only you",
    icon: LuLock,
  },
]

export default function CreateCharacterModal({
  toggleCreateCharacterModal,
  createCharacterModalShown,
}: {
  toggleCreateCharacterModal: () => void
  createCharacterModalShown: boolean
}) {
  const [errors, setErrors] = useState<string>()
  const [characterName, setCharacterName] = useState("")
  const [characterNickname, setCharacterNickname] = useState("")
  const [characterVisibility, setCharacterVisibility] = useState<
    "public" | "private"
  >("public")
  const [characterAvatar, setCharacterAvatar] = useState<string | null>(null)
  const [isDefault, setIsDefault] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitCharacterCreation = async () => {
    if (!characterName.trim() || isSubmitting) return

    setErrors(undefined)
    setIsSubmitting(true)

    try {
      await createCharacter({
        name: characterName.trim(),
        characterAvatar,
        visibility: characterVisibility,
        mainCharacter: isDefault,
        nickname: characterNickname.trim(),
      })
      toggleCreateCharacterModal()
      window.location.reload()
    } catch (error) {
      setErrors(
        error instanceof Error ? error.message : "Character creation failed"
      )
      console.error("Character creation failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      className="w-full max-w-md"
      toggler={toggleCreateCharacterModal}
      state={createCharacterModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-lg font-semibold">
            <LuCat className="text-primary size-5" aria-hidden />
            Create character
          </span>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={toggleCreateCharacterModal}
          >
            <LuXCircle size={18} />
          </Button>
        </div>
      </Modal.Title>

      <Modal.Body>
        <div className="space-y-5 pb-1">
          {errors ? <Note type="error">{errors}</Note> : null}

          <div className="flex items-start gap-4">
            <DropZone
              setData={setCharacterAvatar}
              value={characterAvatar}
              previewSize="compact"
              label="Upload avatar"
            />

            <div className="min-w-0 flex-1 space-y-3 pt-0.5">
              <div className="space-y-1.5">
                <Label htmlFor="character-name">Name</Label>
                <Input
                  id="character-name"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="character-nickname">
                  Nickname{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  id="character-nickname"
                  value={characterNickname}
                  onChange={(e) => setCharacterNickname(e.target.value)}
                />
              </div>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Visibility</legend>
            <RadioGroup
              value={characterVisibility}
              onValueChange={(value) =>
                setCharacterVisibility(value as "public" | "private")
              }
              className="grid grid-cols-2 gap-2"
            >
              {visibilityOptions.map((option) => {
                const Icon = option.icon
                const isSelected = characterVisibility === option.value

                return (
                  <Label
                    key={option.value}
                    htmlFor={`visibility-${option.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 transition-colors",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted/40"
                    )}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`visibility-${option.value}`}
                      className="sr-only"
                    />
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none">
                        {option.label}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {option.description}
                      </p>
                    </div>
                  </Label>
                )
              })}
            </RadioGroup>
          </fieldset>

          <div className="flex items-start gap-2.5">
            <Checkbox
              id="default-character"
              className="mt-0.5"
              checked={isDefault}
              onCheckedChange={(checked) => setIsDefault(checked === true)}
            />
            <Label
              htmlFor="default-character"
              className="cursor-pointer font-normal leading-snug"
            >
              Set as default character
              <span className="text-muted-foreground mt-0.5 block text-xs font-normal">
                Shown first on your profile
              </span>
            </Label>
          </div>
        </div>
      </Modal.Body>

      <div className="border-border flex justify-end gap-2 border-t px-4 py-3">
        <Button
          variant="secondary"
          onClick={toggleCreateCharacterModal}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={submitCharacterCreation}
          disabled={!characterName.trim() || isSubmitting}
        >
          {isSubmitting ? "Creating…" : "Create"}
        </Button>
      </div>
    </Modal>
  )
}
