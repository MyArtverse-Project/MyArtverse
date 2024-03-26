"use client"

import { useEffect, useState } from "react"
import { Container } from "@/components/dashboard"
import { Button } from "@/components/ui/Buttons"
import { ReferenceCard } from "@/components/ui/Cards"
import {
  Checkbox,
  FieldAttribute,
  InputField,
  RichTextField,
  SelectField
} from "@/components/ui/Forms"
import DropZone from "@/components/ui/Forms/DropZone"
import type { ReferenceSheet } from "@/types/characters"
import UploadRefsheetModal from "./UploadRefsheet"

export default function CreateCharacterView() {
  const [name, setName] = useState("")
  const [nickname, setNickname] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [species, setSpecies] = useState("")
  const [pronouns, setPronouns] = useState("")
  const [gender, setGender] = useState("")
  const [bio, setBio] = useState("")
  const [likes, setLikes] = useState("")
  const [dislikes, setDislikes] = useState("")
  const [mainCharacter, setMainCharacter] = useState(false)
  const [characterAvatar, setCharacterAvatar] = useState(null)
  const [attributes, setAttributes] = useState<{ heading: string; value: string }[]>([])
  const [refSheetUploadModal, setRefSheetUploadModal] = useState(false)
  const [refSheetsData, setRefSheetsData] = useState<ReferenceSheet[]>([])
  const [editingData, setEditingData] = useState<ReferenceSheet | null>(null)
  const [saved, setSaved] = useState(true)

  useEffect(() => {
    if (
      characterAvatar ||
      mainCharacter ||
      attributes.length > 0 ||
      refSheetsData.length > 0
    ) {
      setSaved(false)
    }
  }, [characterAvatar, mainCharacter, attributes, refSheetsData])

  const toggleUploadRefSheetModal = () => {
    setRefSheetUploadModal(!refSheetUploadModal)
    return
  }

  const visibilityOptions = [
    { value: "public", label: "Public" },
    { value: "follower", label: "Follower" },
    { value: "private", label: "Private" }
  ]

  // TODO: Grab pronouns from API
  const pronounsOptions = [
    { value: "hehim", label: "He/Him" },
    { value: "sheher", label: "She/Her" },
    { value: "theythem", label: "They/Them" }
  ]

  // TODO: Grab species from API
  const speiciesOptions = [
    { value: "otter", label: "Otter" },
    { value: "husky", label: "Husky" },
    { value: "custom", label: "Custom" }
  ]

  const genderOptions = [
    {
      value: "male",
      label: "Male"
    },
    {
      value: "female",
      label: "Female"
    },
    {
      value: "non-binary",
      label: "Non-Binary"
    }
  ]

  return (
    <Container headingTransparent={false} noChildrenPadding heading="Character Details">
      <div className="relative w-3/4">
        {!saved && (
          <div className="bg-600 fixed bottom-10 right-10 z-20 flex w-1/2 flex-row items-center py-3 text-center">
            <span className="mx-5">You got unsaved changes save?</span>
            <Button>Save</Button>
          </div>
        )}
        <h1 className="px-7 py-6 text-2xl">Basic Info</h1>
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
            {/* TODO: Folders Option Menu */}
          </div>
        </section>
        <section>
          <h1 className="px-7 pt-6 text-2xl">Reference sheets</h1>
          <div className="pl-7 pr-24">
            <p>
              Instead of traditional way of adding an image of a character's reference
              image, you'll need to create a ref sheet item that contains the image
              itself, the proper art credit and color palettes that can be reused and can
              be useful if a character is sold as an adoptable. You can manage all of your
              character's reference sheets here. Learn more
            </p>
            {refSheetsData.map((refSheet, index) => (
              <ReferenceCard
                key={index}
                data={refSheet}
                toggleUploadRefSheetModal={toggleUploadRefSheetModal}
                setEditingData={setEditingData}
              />
            ))}
            <UploadRefsheetModal
              toggleUploadRefSheetModal={toggleUploadRefSheetModal}
              uploadRefsheetModal={refSheetUploadModal}
              refSheetData={refSheetsData}
              editingRefSheet={editingData}
              setNewRefSheetData={setRefSheetsData}
            />
            <Button className="mt-4" onClick={() => setRefSheetUploadModal(true)}>
              New Reference Sheet
            </Button>
          </div>
        </section>
        <section className="mb-5">
          <h1 className="px-7 pt-6 text-2xl">Attributes</h1>
          <div className="pl-7 pr-24">
            <p className="mb-3">
              Note that it’s not necessary to fill all fields, all empty fields won’t be
              shown. Learn more
            </p>
            <div className="space-y-3">
              <div className="flex w-full flex-row space-x-6">
                <SelectField
                  onChange={(e) => setSpecies(e.currentTarget.value)}
                  inputName="Species"
                  options={speiciesOptions}
                />
                <SelectField
                  onChange={(e) => setPronouns(e.currentTarget.value)}
                  inputName="Pronouns"
                  options={pronounsOptions}
                />
                <SelectField
                  onChange={(e) => setGender(e.currentTarget.value)}
                  inputName="Gender"
                  options={genderOptions}
                />
              </div>
              <RichTextField inputName="Bio" />
            </div>
          </div>
        </section>
        <section>
          <h1 className="px-7 pt-6 text-2xl">Preferences</h1>
          <div className="pl-7 pr-24">
            <p className="mb-3">
              The like/dislikes can be in list form or in sentence form! Learn more
            </p>
            <div className="flex w-full flex-row items-center justify-center space-x-3">
              <RichTextField
                onChange={(e) => setLikes(e.currentTarget.value)}
                inputName="Likes"
              />
              <RichTextField
                onChange={(e) => setDislikes(e.currentTarget.value)}
                inputName="Dislikes"
              />
            </div>
          </div>
        </section>
        <section className="pt-6">
          <h1 className="px-7 pt-6 text-2xl">Custom Attributes</h1>
          <div className="pl-7 pr-24">
            <p className="mb-3">
              Add up to 10 custom attributes that best fit your character. This section is
              not best fit for like/dislike preferences. Learn more
            </p>
            <div>
              {attributes.map((attribute, index) => (
                <FieldAttribute
                  key={index}
                  attribute={attribute}
                  setAttributes={setAttributes}
                  attributes={attributes}
                />
              ))}
            </div>
            <div className="flex flex-row space-x-3 pb-16">
              <Button
                onClick={() => setAttributes([...attributes, { heading: "", value: "" }])}
              >
                Add custom attribute
              </Button>
              <Button>Copy attribute(s) from existing character</Button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}
