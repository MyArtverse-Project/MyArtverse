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
import { BACKEND_URL } from "@/utils/env"
import { update } from "lodash"
import type { Character, ReferenceSheet } from "@/types/characters"
import UploadRefsheetModal from "./UploadRefsheet"

export default function EditCharacterView({ character }: { character: Character }) {
  const [formData, setFormData] = useState<Character | null>(null)
  const [characterAvatar, setCharacterAvatar] = useState(null)
  const [attributes, setAttributes] = useState<{ heading: string; value: string }[]>([])
  const [refSheetUploadModal, setRefSheetUploadModal] = useState(false)
  const [refSheetsData, setRefSheetsData] = useState<ReferenceSheet[]>([])
  const [editingData, setEditingData] = useState<ReferenceSheet | null>(null)
  const [saved, setSaved] = useState(true)

  // Merge character data with form data
  useEffect(() => {
    if (character) {
      setFormData(character)
    }

    if (character.refSheets) {
      console.log(character.refSheets)
      setRefSheetsData(character.refSheets)
    }
  }, [character])

  useEffect(() => {
    if (characterAvatar) {
      const formDataCopy = { ...formData }
      formDataCopy.avatarUrl = characterAvatar
      setFormData(formDataCopy)
    }
  }, [characterAvatar, formData])

  const updateFormData = ({ key, value }: { key: string; value: string | boolean }) => {
    setFormData((prev) => {
      if (prev) {
        return { ...prev, [key]: value }
      }

      return null
    })
  }

  const updateAttributes = ({ key, value }: { key: string; value: string }) => {
    setFormData((prev) => {
      if (prev) {
        return { ...prev, attributes: { ...prev.attributes, [key]: value } }
      }

      return null
    })
  }

  const updatePreference = ({ key, value }: { key: string; value: string }) => {
    // Likes/Dislikes Split by new line
    setFormData((prev) => {
      if (prev) {
        return {
          ...prev,
          attributes: {
            ...prev.attributes,
            preferences: { ...prev.attributes.preferences, [key]: value.split("\n") }
          }
        }
      }

      return null
    })
  }

  useEffect(() => {
    if (formData) {
      setSaved(false)
    }
  }, [formData])

  const save = () => {
    const updatedData = {}
    for (const key in formData) {
      if (formData[key] !== character[key]) {
        updatedData[key] = formData[key]
      }
    }

    fetch(`${BACKEND_URL}/v1/character/update/${character.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(updatedData)
    })
      .then((res) => {
        if (res.ok) {
          setSaved(true)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const toggleUploadRefSheetModal = () => {
    save()
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
          <div className="bg-400 fixed bottom-10 right-10 z-20 flex w-1/2 flex-row items-center py-3 text-center">
            <span className="mx-5">You got unsaved changes!</span>
            <Button onClick={save}>Save</Button>
          </div>
        )}

        <h1 className="px-7 py-6 text-2xl after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:border-b">
          Basic Info
        </h1>
        <section className="flex w-full flex-row px-7">
          <div className="pr-20">
            <p className="text-600 mb-2 text-sm font-bold uppercase">Avatar</p>
            <DropZone setData={setCharacterAvatar} value={formData?.avatarUrl || null} />
          </div>
          <div className="w-3/5">
            <div className="mb-4 flex flex-row items-center justify-between space-x-4">
              <InputField
                inputName="Character Name"
                value={formData?.name || ""}
                onChange={(e) =>
                  updateFormData({ key: "name", value: e.currentTarget.value })
                }
                required
              />
              <SelectField
                inputName="Visibility"
                value={formData?.visibility}
                options={visibilityOptions}
                onChange={(e) =>
                  updateFormData({ key: "visibility", value: e.currentTarget.value })
                }
              />
            </div>
            <InputField
              inputName="Nickname"
              value={formData?.nickname || ""}
              required
              onChange={(e) =>
                updateFormData({ key: "nickname", value: e.currentTarget.value })
              }
            />
            <div className="my-3">
              <Checkbox
                checked={formData?.mainCharacter}
                inputName="Main Character"
                label="Set this character as my main character"
                onChange={(e) =>
                  updateFormData({ key: "mainCharacter", value: e.currentTarget.checked })
                }
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
            {refSheetsData.length > 0 &&
              refSheetsData.map((refSheet, index) => (
                <>
                  <ReferenceCard
                    key={index}
                    data={refSheet}
                    toggleUploadRefSheetModal={toggleUploadRefSheetModal}
                    setEditingData={setEditingData}
                  />
                </>
              ))}
            <UploadRefsheetModal
              toggleUploadRefSheetModal={toggleUploadRefSheetModal}
              uploadRefsheetModal={refSheetUploadModal}
              refSheetData={refSheetsData}
              editingRefSheet={editingData}
              setNewRefSheetData={setRefSheetsData}
              characterID={character.id}
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
                  onChange={(e) =>
                    updateFormData({ key: "species", value: e.currentTarget.value })
                  }
                  inputName="Species"
                  options={speiciesOptions}
                  value={formData?.species}
                />
                <SelectField
                  onChange={(e) =>
                    updateAttributes({ key: "pronouns", value: e.currentTarget.value })
                  }
                  inputName="Pronouns"
                  options={pronounsOptions}
                  value={formData?.attributes.pronouns}
                />
                <SelectField
                  onChange={(e) =>
                    updateAttributes({ key: "gender", value: e.currentTarget.value })
                  }
                  inputName="Gender"
                  options={genderOptions}
                  value={formData?.attributes.gender}
                />
              </div>
              <RichTextField
                onChange={(e) =>
                  updateAttributes({ key: "bio", value: e.currentTarget.value })
                }
                inputName="Bio"
                value={formData?.attributes.bio}
              />
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
                onChange={(e) =>
                  updatePreference({ key: "likes", value: e.currentTarget.value })
                }
                inputName="Likes"
                value={formData?.attributes.preferences.likes}
              />
              <RichTextField
                onChange={(e) =>
                  updatePreference({ key: "dislikes", value: e.currentTarget.value })
                }
                inputName="Dislikes"
                value={formData?.attributes.preferences.dislikes}
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
