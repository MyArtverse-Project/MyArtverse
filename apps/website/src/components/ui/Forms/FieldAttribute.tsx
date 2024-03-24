import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { LuDelete, LuMenu } from "react-icons/lu"

// TODO add a wrapper element to track the limit of adding custom attributes
export default function FieldAttribute({ attribute, setAttributes, attributes }) {
  const change = (value: string, type: "heading" | "value") => {
    const index = attributes.findIndex((attr) => attr[type] === attribute[type])
    attributes[index][type] = value
    setAttributes([...attributes])
  }

  const deleteAttribute = () => {
    const index = attributes.findIndex((attr) => attr.heading === attribute.heading)
    attributes.splice(index, 1)
    setAttributes([...attributes])
  }

  return (
    <div className="mb-6 flex w-full flex-row items-center justify-center space-x-4">
      <LuMenu size={50} height={20} width={20} />
      <InputField
        className="w-full"
        noLabel
        placeholder="Heading"
        value={attribute.heading}
        onChange={(e) => change(e.currentTarget.value, "heading")}
      />
      <InputField
        className="w-full"
        noLabel
        placeholder="Value"
        value={attribute.value}
        onChange={(e) => change(e.currentTarget.value, "value")}
      />
      <Button
        onClick={() => deleteAttribute()}
        icon={<LuDelete size={20} />}
        variant="error"
      />
    </div>
  )
}
