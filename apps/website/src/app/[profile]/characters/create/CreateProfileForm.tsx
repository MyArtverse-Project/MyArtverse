"use client"

import { useState } from "react"

import { Fieldset } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FormWithProgress, InputField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Drop/DropZone"
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown"
import { MoreVerticalIcon } from "lucide-react"
import Checkbox from "@/components/ui/Forms/Checkbox"

export default function CreateCharacterForm() {
  const [isBasicComplete, setBasicComplete] = useState(false)
  const [isDetailsComplete, setDetailsComplete] = useState(false)
  const [isImagesComplete, setImagesComplete] = useState(false)
  const [isAdditionalComplete, setAdditionalComplete] = useState(false)
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [additionalMeta, setAdditionalMeta] = useState(false)
  const [pronouns, setPronouns] = useState("")

  const progress = [
    {
      item: "Basic Information",
      isComplete: isBasicComplete
    },
    {
      item: "Details",
      isComplete: isDetailsComplete
    },
    {
      item: "Images",
      isComplete: isImagesComplete
    },
    {
      item: "Additional Options",
      isComplete: isAdditionalComplete
    }
  ]

  return (
    <>
      <section className="max-w-screen-xl mt-20 mb-12 mx-auto px-9 text-center">
        <h1 className="not-prose font-bold font-inter !leading-[4.25rem] text-4xl xl:text-5xl bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-500 text-transparent bg-clip-text">
          Create new Character
        </h1>
      </section>
      <FormWithProgress progress={progress}>
        <main className="w-full flex flex-col gap-y-5">
          <Fieldset heading="Basic Information">
            <InputField
              required
              inputName="Name"
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* TODO: SELECT MENU COMPONENT FOR PRONOUNS */}
            {/* TODO: SELECT MENU COMPONENT FOR SPECIES */}
            {/* TODO: SELECT MENU COMPONENT FOR VISIBILTY */}
          </Fieldset>
          <Fieldset
            heading="Details"
            description={
              <div className="flex flex-col gap-y-2">
                Provide details, traits, and quirks about your character! Note
                that any fields that aren't filled below aren't shown on the
                character page.
              </div>
            }
          >
            <InputField
              required
              inputName="About"
              type="text"
              placeholder=""
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <Checkbox
              checked={additionalMeta}
              label="Specify additional metadata (i.e. height, weight)"
              inputName="additionalMeta"
              onChange={(e) => setName(e.target.value)}
            />
            {/* TODO: Check Box for additional Meta Data */}
            {/* TODO: Display Meta Data */}
            {/* TODO: Check Box for Enabling Likes/Dislikes */}
            {/* TODO: Display Likes/Dislikes Field When Enabled */}
          </Fieldset>
          <Fieldset
            heading="Upload/Import Images"
            description="Upload images of your ref sheet, from a commission, art trade, etc. directly or import from Google Drive, Dropbox, Facebook, etc."
          >
            <DropZone />
          </Fieldset>
          <Fieldset heading="Options">
            {/* TODO: Check Box "Sell as adoptable" */}
            {/* TODO: Display Asking Price when checked */}
            {/* TODO: Dropdown for collections */}
            {/* TODO: CHeck Box "Exclude character from comissions" */}
            {/* TODO: CHeck Box Prevent others from tagging */}
          </Fieldset>
          <div className="flex justify-between">
            <Button>Discard Changes</Button>
            <div className="flex flex-row">
              <Button>Save as draft</Button>
              <Button>Save and Exit</Button>
            </div>
          </div>
        </main>
      </FormWithProgress>
    </>
  )
}
