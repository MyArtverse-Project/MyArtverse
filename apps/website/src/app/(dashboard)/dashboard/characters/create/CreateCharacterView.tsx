"use client"

import { useState } from "react"
import { Container } from "@/components/dashboard"
import { Button } from "@/components/ui/Buttons"
import DropZone from "@/components/ui/Drop/DropZone"
import { InputField } from "@/components/ui/Forms"
import Attribute from "@/components/ui/Forms/Attribute"
import Checkbox from "@/components/ui/Forms/Checkbox"
import RichTextField from "@/components/ui/Forms/RichTextField"
import SelectField from "@/components/ui/Forms/SelectField"
import ReferenceCard from "@/components/ui/ReferenceCard"
import UploadRefsheet from "./UploadRefsheet"

export default function CreateCharacterView() {
  const [mainCharacter, setMainCharacter] = useState(false)
  const [characterAvatar, setCharacterAvatar] = useState(null)
  const [attributes, setAttributes] = useState<{ heading: string; value: string }[]>([])
  const [refSheetUploadModal, setRefSheetUploadModal] = useState(false)

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
      <div className="w-3/4">
        <h1 className="px-7 py-6 text-2xl">Basic Info</h1>
        <section className="flex w-full flex-row px-7">
          <div className="pr-20">
            <p className="text-600 mb-2 text-sm font-bold uppercase">Avatar</p>
            <DropZone setData={setCharacterAvatar} />
          </div>
          <div className="w-full">
            <div className="mb-4 flex flex-row items-center justify-between space-x-4">
              <InputField inputName="Character Name" required />
              <SelectField inputName="Visibility" options={visibilityOptions} />
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
            {/* TODO: Folders Option Menu */}
          </div>
        </section>
        <section>
          <h1 className="px-7 pt-6 text-2xl">Reference sheets</h1>
          <div className="pl-7 pr-24">
            <p>
              Instead of traditional way of adding an image of a character’s reference
              image, you’ll need to create a ref sheet item that contains the image
              itself, the proper art credit and color palettes that can be reused and can
              be useful if a character is sold as an adoptable. You can manage all of your
              character’s reference sheets here. Learn more
            </p>
            {/* TODO: Grab reference sheets from API */}
            <ReferenceCard
              src={"/DefaultRefrenceSheet.png"}
              alt="Placeholder"
              label="Character Name"
              artist="Artist Name"
              variantCount={1}
            />
            <UploadRefsheet
              toggleUploadRefSheetModal={toggleUploadRefSheetModal}
              uploadRefsheetModal={refSheetUploadModal}
              newRefSheetData={null}
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
                <SelectField inputName="Species" options={speiciesOptions} />
                <SelectField inputName="Pronouns" options={pronounsOptions} />
                <SelectField inputName="Gender" options={genderOptions} />
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
              <RichTextField inputName="Likes" />
              <RichTextField inputName="Dislikes" />
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
                <Attribute
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
