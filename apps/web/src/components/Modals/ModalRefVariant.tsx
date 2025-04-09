import type { Variant } from "@/types/characters"
import { cn } from "@mav/shared/utils"
import { InputField } from "@mav/ui/components/fields"
import Image from "next/image"
import Checkbox from "../Forms/Checkbox"

export default function ModalRefVariant({
  name,
  nsfw,
  url,
  onChangeName,
  onChangeCheck,
  deleteVariant
}: Variant) {
  return (
    <div
      onClick={deleteVariant}
      className={cn("my-4 flex flex-row justify-between rounded-md p-3")}
    >
      <Image src={url} alt="Ref Sheet" width={200} height={100} />
      <div className="mx-10 w-3/5">
        <InputField
          noLabel
          placeholder="Variant Name"
          required
          value={name}
          onChange={onChangeName}
        />
        <Checkbox
          label="Mark ref as NSFW"
          checked={nsfw}
          inputName="NSFW"
          onChange={onChangeCheck}
        />
      </div>
    </div>
  )
}
