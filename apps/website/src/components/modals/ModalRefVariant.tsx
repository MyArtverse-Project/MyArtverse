import React from "react"
import { MFImage } from "@/components/ui"
import { Checkbox, InputField } from "@/components/ui/Forms"

export default function ModalRefVariant() {
  return (
    <div className="my-4 flex flex-row justify-between px-3">
      <MFImage
        src="/DefaultRefrenceSheet.png"
        alt="User Banner"
        width={200}
        height={100}
      />
      <div className="mx-10 w-3/5">
        <InputField noLabel placeholder="Variant Name" required className="my-3" />
        <Checkbox
          label="Mark ref as NSFW"
          checked={false}
          inputName="NSFW"
          onChange={() => {}}
        />
      </div>
    </div>
  )
}
