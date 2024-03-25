import { useEffect, useState } from "react"
import { ModalRefVariant } from "@/components/modals"
import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Forms/DropZone"
import Modal from "@/components/ui/Modal"
import { BACKEND_URL } from "@/utils/env"
import { FaFolderPlus } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"
import type { ReferenceSheet, Varient } from "@/types/characters"

export default function UploadRefsheetModal({
  toggleUploadRefSheetModal,
  uploadRefsheetModal,
  newRefSheetData
}: {
  toggleUploadRefSheetModal: () => void
  uploadRefsheetModal: boolean
  // TODO: Figire out the type for newRefSheetData
  newRefSheetData?: ReferenceSheet
}) {
  const [saved, setSaved] = useState(true)
  const [mainRefURL, setMainRefUrl] = useState(null)
  const [name, setName] = useState("")
  const [artist, setArtist] = useState("")
  const [colors, setColors] = useState<string[]>([])
  const [refVariants, setRefVariants] = useState<Varient[]>([])

  useEffect(() => {
    if (mainRefURL) {
      setRefVariants((prev) => {
        const newMain = { ...prev[0], url: mainRefURL, main: true }
        return [newMain, ...prev.slice(1)]
      })
    }
  }, [mainRefURL])

  useEffect(() => {
    setSaved(false)
  }, [name, artist, colors, refVariants])

  const addVariant = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData()
    const uploadedFile = e.target.files[0]
    formData.append("file", uploadedFile)

    try {
      const response = await fetch(`${BACKEND_URL}/v1/profile/upload`, {
        method: "POST",
        body: formData,
        credentials: "include"
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()

      const newVariant = {
        name: "New Variant",
        url: data.url,
        nsfw: false,
        main: false
      }

      const newVariants = [newVariant, ...refVariants]
      setRefVariants(newVariants)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  const save = () => {
    // TODO: Update the newRefSheetData with the new data
    setSaved(true)
  }

  const close = () => {
    setName("")
    setArtist("")
    setColors([])
    setRefVariants([])
    toggleUploadRefSheetModal()
  }

  const saveAndClose = () => {
    save()
    close()
  }

  return (
    <Modal
      className="w-3/4"
      toggler={toggleUploadRefSheetModal}
      state={uploadRefsheetModal}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaFolderPlus />
            Upload Ref Sheet
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleUploadRefSheetModal}
          />
        </div>
      </Modal.Title>
      <section className="flex flex-row justify-around p-4">
        <div className="w-2/5">
          <span className="mb-4 text-2xl">Primary Ref Sheet</span>
          <DropZone setData={setMainRefUrl} className="h-full w-full" />
        </div>
        <div>
          <InputField
            inputName="Name"
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <span className="text-600 mb-2 mt-4 flex gap-x-0.5 font-bold uppercase">
            Color Palette (User Selectable)
          </span>
          <div>
            <input
              type="color"
              className="border-400 bg-100 border border-solid"
              name="color1"
              id="color1"
            />
            <input
              type="color"
              className="border-400 bg-100 border border-solid"
              name="color2"
              id="color2"
            />
            <input
              type="color"
              className="border-400 bg-100 border border-solid"
              name="color3"
              id="color3"
            />
            <input
              type="color"
              className="border-400 bg-100 border border-solid"
              name="color4"
              id="color4"
            />
            <input
              type="color"
              className="border-400 bg-100 border border-solid"
              name="color5"
              id="color5"
            />
          </div>
          <div className="w-full py-5">
            <span className="text-600 mb-2 mt-4 flex gap-x-0.5 font-bold uppercase">
              Additional Variants
            </span>
            <div className="border-400 hover:bg-400 relative flex flex-row justify-between rounded-md border border-solid px-3">
              <input
                type="file"
                onChange={addVariant}
                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full opacity-0"
              />
              <div className="my-3 flex flex-row items-center justify-between">
                <MFImage
                  src="/DefaultRefrenceSheet.png"
                  alt="User Banner"
                  width={200}
                  height={100}
                />
                <div className="mx-10 w-3/5">
                  <span className="text-2xl">Upload a new variant</span>
                </div>
              </div>
            </div>
            {refVariants.map((variant, index) => (
              <ModalRefVariant {...variant} key={index} />
            ))}
          </div>
        </div>
      </section>
      <div className="flex flex-row items-center justify-end p-4">
        {saved ? null : "You have unsaved changes*"}
        <Button className="float-right mx-4" onClick={save}>
          Save
        </Button>
        <Button className="x-4 float-right" onClick={saveAndClose}>
          Save & Close
        </Button>
      </div>
    </Modal>
  )
}
