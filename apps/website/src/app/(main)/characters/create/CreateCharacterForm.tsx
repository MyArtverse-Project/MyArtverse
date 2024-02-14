"use client"

import { useState } from "react"
import { Fieldset } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FormWithProgress } from "@/components/ui/Forms"

export default function CreateCharacterForm() {
  const [isBasicComplete, setBasicComplete] = useState(false)
  const [isDetailsComplete, setDetailsComplete] = useState(false)
  const [isImagesComplete, setImagesComplete] = useState(false)
  const [isAdditionalComplete, setAdditionalComplete] = useState(false)

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
      <section className="mx-auto mb-12 mt-20 max-w-screen-xl px-9 text-center">
        <h1 className="not-prose font-inter bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-500 bg-clip-text text-4xl font-bold !leading-[4.25rem] text-transparent xl:text-5xl">
          Create new Character
        </h1>
      </section>
      <FormWithProgress progress={progress}>
        <main className="flex w-full flex-col gap-y-5">
          <Fieldset heading="Basic Info"></Fieldset>
          <Fieldset
            heading="Details"
            description={
              <div className="flex flex-col gap-y-2">
                Provide details, traits, and quirks about your character! Note that any
                fields that aren't filled below aren't shown on the character page.
              </div>
            }
          ></Fieldset>
          <Fieldset
            heading="Upload/Import Images"
            description="Upload images of your ref sheet, from a commission, art trade, etc. directly or import from Google Drive, Dropbox, Facebook, etc."
          ></Fieldset>
          <Fieldset heading="Options"></Fieldset>
          <div className="flex justify-between">
            <Button className="">Discard Changes</Button>
            <div className="flex flex-row">
              <Button className="">Save as Draft</Button>
              <Button className="">Save and Exit</Button>
            </div>
          </div>
        </main>
      </FormWithProgress>
    </>
  )
}
