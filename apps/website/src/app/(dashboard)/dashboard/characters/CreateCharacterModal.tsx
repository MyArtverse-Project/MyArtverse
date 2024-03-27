"use client"

import { useState } from "react"
import { Modal } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Checkbox, InputField, SelectField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Forms/DropZone"
import { BACKEND_URL } from "@/utils/env"
import { FaPlus } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"

export default function CreateCharacterView({
  toggleCreateCharacterModal,
  createCharacterModal
}: {
  toggleCreateCharacterModal: () => void
  createCharacterModal: boolean
}) {
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [mainCharacter, setMainCharacter] = useState(false)
  const [characterAvatar, setCharacterAvatar] = useState(null)

  const visibilityOptions = [
    { value: "public", label: "Public" },
    { value: "follower", label: "Follower" },
    { value: "private", label: "Private" }
  ]

  const createCharacter = () => {
    const data = {
      name,
      nickname,
      visibility,
      mainCharacter,
      characterAvatar
    }
    fetch(`${BACKEND_URL}/v1/character/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    })
      .then((res) => res)
      .then((res) => {
        if (res.ok) {
          toggleCreateCharacterModal()
          window.location.reload()
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  return (
    <Modal
      toggler={toggleCreateCharacterModal}
      state={createCharacterModal}
      className="pb-10"
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaPlus />
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
      <section className="flex w-full flex-row px-7">
        <div className="pr-20">
          <p className="text-600 mb-2 text-sm font-bold uppercase">Avatar</p>
          <DropZone setData={setCharacterAvatar} />
        </div>
        <div className="w-3/5">
          <div className="mb-4 flex flex-row items-center justify-between space-x-4">
            <InputField
              inputName="Character Name"
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
            <SelectField
              inputName="Visibility"
              options={visibilityOptions}
              onChange={(e) => setVisibility(e.currentTarget.value)}
            />
          </div>
          <InputField
            inputName="Nickname"
            required
            onChange={(e) => setNickname(e.currentTarget.value)}
          />
          <div className="my-3">
            <Checkbox
              checked={mainCharacter}
              inputName="Main Character"
              label="Set this character as my main character"
              onChange={(e) => setMainCharacter(e.target.checked)}
            />
          </div>
          <Button onClick={createCharacter} className="float-end">
            Create Character
          </Button>
        </div>
      </section>
    </Modal>
  )
}
