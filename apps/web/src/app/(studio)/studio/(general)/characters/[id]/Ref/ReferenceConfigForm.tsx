import Checkbox from "@/components/layouts/Forms/Checkbox"
import DropZone from "@/components/Modals/DropZone"
import { Character } from "@/types/characters"
import { createRefSheet } from "@/utils/api"
import { Button } from "@mav/ui/components/buttons"
import { InputField, Textarea } from "@mav/ui/components/fields"
import Image from "next/image"
import { useRef, useState } from "react"
import { LuGripVertical, LuPlus } from "react-icons/lu"

export interface ReferenceVariant {
  title: string
  artist: string
  description: string
  image: string
  primary: boolean
  colors: string[]
}

export function ReferenceConfigForm({
  image,
  character,
  onClose,
}: {
  image: string
  character: Character
  onClose: (formData: any) => void
}) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [artist, setArtist] = useState("")
  const [primary, setPrimary] = useState(false)
  const [linkedTo, setLinkedTo] = useState(character.id)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [referenceVariants, setReferenceVariants] = useState<ReferenceVariant[]>([
    {
      title: "",
      artist: "",
      description: "",
      image,
      primary: true,
      colors: ["#000000", "#ffffff"],
    },
  ])

  const updateVariant = (index: number, key: keyof ReferenceVariant, value: any) => {
    setReferenceVariants((prev) => {
      const newVariants = [...prev]
      newVariants[index] = { ...newVariants[index], [key]: value }
      return newVariants
    })
  }

  const handleSubmit = async () => {

    onClose({
      characterId: linkedTo,
      refSheet: {
        name,
        description,
        variants: referenceVariants
      }
    })
  }

  const updateColor = (index: number, colorIndex: number, value: string) => {
    const newVariants = [...referenceVariants]
    newVariants[index].colors[colorIndex] = value
    setReferenceVariants(newVariants)
  }

  const addColor = (index: number) => {
    const newVariants = [...referenceVariants]
    newVariants[index].colors.push("#cccccc")
    setReferenceVariants(newVariants)
  }

  const removeColor = (index: number, colorIndex: number) => {
    const newVariants = [...referenceVariants]
    newVariants[index].colors.splice(colorIndex, 1)
    setReferenceVariants(newVariants)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const url = event.target?.result as string
        setReferenceVariants((prev) => {
          const newVariants = [...prev]
          newVariants[0].image = url
          return newVariants
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const addVariant = (url: string) => {
    setReferenceVariants((prev) => [
      ...prev,
      {
        title: "",
        artist: "",
        description: "",
        image: url,
        primary: false,
        colors: [],
      },
    ])
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <InputField inputName="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField inputName="Linked to" value={linkedTo} onChange={(e) => setLinkedTo(e.target.value)} />
        </div>
        <Textarea
          inputName="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          inputName="Artist Credit (Url Link or User)"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <Checkbox
              inputName={`primary`}
              label="Mark reference sheet as primary"
              checked={primary}
              onChange={() => setPrimary(!primary)}
            />
      </div>

      {referenceVariants.map((variant, index) => (
        <div
          key={index}
          className="flex flex-row gap-6 border border-400 px-4 py-12 rounded-lg bg-100"
        >
          <div className="flex flex-row items-center">
            <LuGripVertical
              size={20}
              className="text-700 cursor-move z-10 mr-4"
            />
            <div className="w-80 h-64 flex flex-col">
              <Image
                width={320}
                height={256}
                src={variant.image}
                alt="Reference Preview"
                className="w-80 h-64 rounded object-contain"
              />
              <div className="flex items-start justify-start">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="secondary" className="mt-2 w-80" onClick={handleButtonClick} position="center">
                  Replace Image
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <InputField
              inputName="Variant Title"
              value={variant.title}
              onChange={(e) => updateVariant(index, "title", e.target.value)}
            />
            <Checkbox
              inputName={`primary-${index}`}
              label="Set this reference image by default"
              checked={variant.primary}
              onChange={() =>
                setReferenceVariants((prev) =>
                  prev.map((v, i) => ({ ...v, primary: i === index }))
                )
              }
            />

            <div>
              <p className="text-sm font-medium text-700 mb-1">Color Palette</p>
              <div className="flex flex-wrap gap-2 items-center">
                {variant.colors.map((color, cIndex) => (
                  <div key={cIndex} className="flex items-center gap-1">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(index, cIndex, e.target.value)}
                      className="w-6 h-6 rounded-full border"
                    />
                  </div>
                ))}
                <Button variant="tritery" icon={<LuPlus />} onClick={() => addColor(index)} />
              </div>
            </div>
          </div>
        </div>
      ))}
      <DropZone setData={addVariant} label="Add more by dropping images here" />

      <Button variant="primary" className="self-end mt-4" onClick={handleSubmit}>
        Save Reference
      </Button>
    </div>
  )
}
