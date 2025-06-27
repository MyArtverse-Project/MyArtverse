"use client"
import { Button } from "@mav/ui/components/buttons"
import { useState } from "react"
import { LuCat, LuUsers, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"
import { InputField } from "@mav/ui/components/fields"
import { Label, Radio, RadioGroup } from "@headlessui/react"
import clsx from 'clsx'
import DropZone from "./DropZone"
import Checkbox from "../layouts/Forms/Checkbox"
import { createCharacter } from "@/utils/api"

export default function CreateCharacterModal({
  toggleCreateCharacterModal,
  createCharacterModalShown
}: {
  toggleCreateCharacterModal: () => void
  createCharacterModalShown: boolean
}) {
  const [errors, setErrors] = useState<string>()
  const [characterName, setCharacterName] = useState<string>("")
  const [characterNickname, setCharacterNickname] = useState<string>("")
  const [characterVisibility, setCharacterVisibility] = useState<"public" | "private">("public")
  const [characterAvatar, setCharacterAvatar] = useState<string | null>(null)
  const [isDefault, setIsDefault] = useState<boolean>(false)

  const handleDrop = (url: string) => {
    setCharacterAvatar(url)
    return
  }

  const submitCharacterCreation = async () => {
    const data = { name: characterName, characterAvatar: characterAvatar, visibility: characterVisibility, mainCharacter: isDefault, nickname: characterNickname }
    await createCharacter(data).then(() => {
      toggleCreateCharacterModal()
      window.location.reload()
    }).catch((error) => {
      setErrors(error.message)
      console.error("Character creation failed:", error)
    })
  }

  return (
    <Modal
      className="w-1/6 px-4"
      toggler={toggleCreateCharacterModal}
      state={createCharacterModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <LuCat />
            Create Character
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleCreateCharacterModal}
          />
        </div>
      </Modal.Title>
      <Modal.Body>
        <div className="flex flex-col gap-y-4">

          {errors && (
            <div className="my-3 px-4">
              <Note type="error">{errors}</Note>
            </div>
          )}
          <InputField
            inputName="Name"
            value={characterName}
            placeholder="Enter character name"
            onChange={(e) => setCharacterName(e.target.value)}
          />
          <InputField
            inputName="Nickname"
            value={characterNickname}
            placeholder="Enter character nickname"
            onChange={(e) => setCharacterNickname(e.target.value)}
          />
          <RadioGroup value={characterVisibility} onChange={setCharacterVisibility}>
            <Label className="mb-2 block text-sm font-semibold text-zinc-300">Character Visibility</Label>
            <div className="flex flex-col gap-4 mt-2">
              <Radio value="public">
                {({ checked }) => (
                  <div
                    className={clsx(
                      "flex flex-col rounded-md border p-4 transition-all",
                      checked
                        ? "border-primary bg-800"
                        : "border-700 hover:border-500 opacity-70"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <LuUsers size={20} className="text-primary" />
                      <span className="text-white font-medium">Public</span>
                    </div>
                    <span className="text-sm mt-1">
                      Anyone can see this character.
                    </span>
                  </div>
                )}
              </Radio>

              <Radio value="private">
                {({ checked }) => (
                  <div
                    className={clsx(
                      "flex flex-col rounded-md border p-4 transition-all",
                      checked
                        ? "border-primary bg-800"
                        : "border-700 hover:border-500 opacity-70"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <LuUsers size={20} className="text-primary" />
                      <span className="text-white font-medium">Private</span>
                    </div>
                    <span className="text-sm mt-1">
                      Only you can see this character.
                    </span>
                  </div>
                )}
              </Radio>
            </div>
          </RadioGroup>
          <DropZone setData={handleDrop} />
          <div className="flex flex-row items-center justify-between pb-4">
            <Checkbox inputName="default" label="Set as default character" checked={isDefault} onChange={() => setIsDefault(!isDefault)} />
            <Button onClick={submitCharacterCreation}>Create Character</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
