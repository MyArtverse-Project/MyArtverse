"use client"

import { useState } from "react"
import Link from "next/link"

import type { IconName } from "@fortawesome/fontawesome-svg-core"
import { CreditCardIcon, LockIcon } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Fieldset, Note, Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FormWithProgress, InputField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Drop/DropZone"

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
      <section
        className="max-w-screen-xl mt-20 mb-12 mx-auto px-9 text-center"
        data-new-user-onboarding=""
      >
        <h1 className="not-prose font-bold font-inter !leading-[4.25rem] text-4xl xl:text-5xl bg-gradient-to-tl from-blue-700 via-purple-700 to-pink-500 text-transparent bg-clip-text">
          Create new Character
        </h1>
      </section>
      <FormWithProgress progress={progress}>
        <main className="w-full flex flex-col gap-y-5">
          <Fieldset heading="Basic Info"></Fieldset>
          <Fieldset
            heading="Details"
            description={
              <div className="flex flex-col gap-y-2">
                <span>
                  Provide details, traits, and quirks about your character! Note
                  that any fields that aren’t filled below aren’t shown on the
                  character page.
                </span>
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
