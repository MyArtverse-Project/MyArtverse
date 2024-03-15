"use client"

import { Input } from "postcss"
import React from "react"
import { Container, Heading } from "@/components/dashboard"
import { MFImage } from "@/components/ui"
import DropZone from "@/components/ui/Drop/DropZone"
import { InputField } from "@/components/ui/Forms"
import Checkbox from "@/components/ui/Forms/Checkbox"

export default function CreateCharacterView() {
  const [mainCharacter, setMainCharacter] = React.useState(false)

  return (
    <Container headingTransparent={false} noChildrenPadding heading="Character Details">
      <h1 className="px-7 py-6 text-2xl">Basic Info</h1>
      <section className="flex w-3/4 flex-row px-7">
        <div className="pr-20">
          <p className="text-600 mb-2 text-sm font-bold uppercase">Avatar</p>
          <DropZone />
        </div>
        <div className="w-full">
          <div className="mb-4 flex flex-row items-center justify-between">
            <InputField inputName="Character Name" required />
            <div className="ml-4 flex w-full flex-col gap-y-1.5">
              <span className="text-600 gap-x-0.5 font-bold uppercase ">Pronouns</span>
              <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
                <option value="none" disabled>
                  Select a pronoun
                </option>
                <option value="hehim">He/Him</option>
                <option value="sheher">She/Her</option>
                <option value="theythem">They/Them</option>
              </select>
            </div>
          </div>
          <InputField inputName="Nickname" required />
          <div className="my-3">
            <Checkbox
              checked={mainCharacter}
              inputName="Main Character"
              label="Set this character as my main character"
              onChange={(e) => setMainCharacter(e.target.checked)}
            />
          </div>
          <div className="flex w-full flex-col gap-y-1.5">
            <span className="text-600 gap-x-0.5 font-bold uppercase ">Folder</span>
            <select
              multiple
              className="text-700 border-400 bg-100 rounded-md border px-4 py-2"
            >
              <option value="hehim">He/Him</option>
              <option value="hehim">She/Her</option>
              <option value="hehim">They/Them</option>
            </select>
          </div>
        </div>
      </section>
    </Container>
  )
}
