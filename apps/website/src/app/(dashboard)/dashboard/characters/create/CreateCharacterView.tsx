"use client"

import { useState } from "react"
import { Container, Heading } from "@/components/dashboard"
import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import DropZone from "@/components/ui/Drop/DropZone"
import { InputField } from "@/components/ui/Forms"
import Checkbox from "@/components/ui/Forms/Checkbox"
import Attribute from "./Attribute"
import ReferenceCard from "./ReferenceCard"

export default function CreateCharacterView() {
  const [mainCharacter, setMainCharacter] = useState(false)
  const [characterAvatar, setCharacterAvatar] = useState(null)
  const [attributes, setAttributes] = useState<{ heading: string; value: string }[]>([])

  return (
    <Container headingTransparent={false} noChildrenPadding heading="Character Details">
      <div className="mx-auto w-3/4">
        <h1 className="px-7 py-6 text-2xl">Basic Info</h1>
        <section className="flex w-3/4 flex-row px-7">
          <div className="pr-20">
            <p className="text-600 mb-2 text-sm font-bold uppercase">Avatar</p>
            <DropZone setData={setCharacterAvatar} />
          </div>
          <div className="w-full">
            <div className="mb-4 flex flex-row items-center justify-between">
              <InputField inputName="Character Name" required />
              <div className="ml-4 flex w-full flex-col gap-y-1.5">
                <span className="text-600 gap-x-0.5 font-bold uppercase ">
                  Visibility
                </span>
                <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
                  <option value="none" disabled>
                    Visbility
                  </option>
                  <option value="public">Public</option>
                  <option value="follower">Followers Only</option>
                  <option value="private">Private</option>
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
            {/* TODO: Folders */}
            {/* <div className="flex w-full flex-col gap-y-1.5">
            <span className="text-600 gap-x-0.5 font-bold uppercase ">Folder</span>
            <select
              multiple
              className="text-700 border-400 bg-100 rounded-md border px-4 py-2"
            >
              <option value="hehim">He/Him</option>
              <option value="hehim">She/Her</option>
              <option value="hehim">They/Them</option>
            </select>
          </div> */}
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
            <div>
              <ReferenceCard
                src={"/DefaultRefrenceSheet.png"}
                alt="Placeholder"
                label="Character Name"
                artist="Artist Name"
                varients={1}
              />
              <Button className="mt-4">New Reference Sheet</Button>
            </div>
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
                <div className="flex w-full flex-col gap-y-1.5">
                  <span className="text-600 gap-x-0.5 font-bold uppercase ">Species</span>
                  <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
                    <option value="none" disabled>
                      Species
                    </option>
                    <option value="public">Otter</option>
                    <option value="follower">Husky</option>
                    <option value="private">Custom</option>
                  </select>
                </div>
                <div className="flex w-full flex-col gap-y-1.5">
                  <span className="text-600 gap-x-0.5 font-bold uppercase ">
                    Pronouns
                  </span>
                  <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
                    <option value="none" disabled>
                      Pronouns
                    </option>
                    <option value="public">He/Him</option>
                    <option value="follower">She/Her</option>
                    <option value="private">They/Them</option>
                  </select>
                </div>
                <div className="flex w-full flex-col gap-y-1.5">
                  <span className="text-600 gap-x-0.5 font-bold uppercase ">Gender</span>
                  <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
                    <option value="none" disabled>
                      Gender
                    </option>
                    <option value="public">Male</option>
                    <option value="follower">Female</option>
                    <option value="private">Non-Binary</option>
                  </select>
                </div>
              </div>
              <div className="h-32 w-full space-y-2">
                <span className="text-600 flex gap-x-0.5 font-bold uppercase">Bio</span>
                <textarea
                  id="likes"
                  className="text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2"
                />
              </div>
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
              <div className="h-32 w-full space-y-2">
                <span className="text-600 flex gap-x-0.5 font-bold uppercase">Likes</span>
                <textarea
                  id="likes"
                  className="text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2"
                />
              </div>
              <div className="h-32 w-full space-y-2">
                <span className="text-600 flex gap-x-0.5 font-bold uppercase">
                  Dislikes
                </span>
                <textarea
                  id="dislikes"
                  className="text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2"
                />
              </div>
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
