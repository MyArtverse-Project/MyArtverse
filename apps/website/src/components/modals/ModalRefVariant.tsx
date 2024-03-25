import React from "react"
import type { Varient } from "@/app/(dashboard)/dashboard/characters/create/CreateCharacterView"
import { MFImage } from "@/components/ui"
import { Checkbox, InputField } from "@/components/ui/Forms"
import cn from "@/utils/cn"

export default function ModalRefVariant({ main, name, nsfw, url }: Varient) {
  return (
    <div
      className={cn(
        "my-4 flex flex-row justify-between rounded-md p-3",
        main ? "bg-400 border " : ""
      )}
    >
      <MFImage src={url} alt="Ref Sheet" width={200} height={100} />
      <div className="mx-10 w-3/5">
        <InputField
          noLabel
          placeholder="Variant Name"
          required
          className="my-3"
          value={main ? "MAIN VARIENT" : name}
          readOnly={main}
        />
        <Checkbox
          label="Mark ref as NSFW"
          checked={nsfw}
          inputName="NSFW"
          onChange={() => {}}
        />
      </div>
    </div>
  )
}
