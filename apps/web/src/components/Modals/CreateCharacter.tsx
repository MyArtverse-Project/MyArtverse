"use client"

import { createCharacter } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import VisibilityField from "@/components/layouts/Forms/VisibilityField"
import {
  type ContentVisibility,
  normalizeContentVisibility,
} from "@/utils/visibility"
import { useState } from "react"
import { LuCat, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"
import DropZone from "./DropZone"

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
  const [characterVisibility, setCharacterVisibility] =
    useState<ContentVisibility>("public")
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

          <VisibilityField
            value={characterVisibility}
            onChange={setCharacterVisibility}
          />

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
