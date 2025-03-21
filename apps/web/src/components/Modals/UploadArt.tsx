"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Buttons"
import { Checkbox, InputField } from "@/components/ui/Forms"
import DropZone from "@/components/ui/Forms/DropZone"
import Modal from "@/components/ui/Modal"
import { BACKEND_URL } from "@/utils/env"
import { FaFolderPlus } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"

// TODO: Add Delete
// TODO: Fix Clear Form

export default function UploadArtModal({
  toggleUploadArtModal,
  uploadArtModal,
  characterId
}: {
  toggleUploadArtModal: () => void
  uploadArtModal: boolean
  characterId: string
}) {
  const [artUrl, setArtUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [userAsArtist, setUserAsArist] = useState(false)

  useEffect(() => {
    setArtUrl("")
    setTitle("")
    setDescription("")
    setTags([])
    setUserAsArist(false)
  }, [uploadArtModal])

  const uploadArt = async () => {
    const data = await fetch(`${BACKEND_URL}/v1/art/upload/${characterId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imageUrl: artUrl,
        title,
        description,
        tags,
        userAsArtist
      })
    })

    if (!data.ok) {
      console.error("Failed to upload artwork")
      return
    }

    window.location.reload()
  }

  return (
    <Modal className="w-3/5 px-4" toggler={toggleUploadArtModal} state={uploadArtModal}>
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaFolderPlus />
            Upload Artwork
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleUploadArtModal}
          />
        </div>
      </Modal.Title>
      <section className="flex flex-row justify-around space-x-5 p-4">
        <DropZone
          aspectRatio="1"
          setData={setArtUrl}
          // className="w-1/2"
        />
        <div className="w-1/2 space-y-4">
          <InputField
            inputName="Title"
            placeholder="Title"
            className="w-full"
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
          />
          <InputField
            inputName="Description"
            placeholder="Description"
            className="w-full"
            onChange={(e) => setDescription(e.currentTarget.value)}
            value={description}
          />
          <InputField
            inputName="Tags (Enter to add)"
            placeholder="Tags"
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTags([...tags, e.currentTarget.value])
                e.currentTarget.value = ""
              }
            }}
          />
          <div className="my-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-300 hover:bg-error my-4 mr-4 rounded-md px-2 py-1 text-white hover:cursor-not-allowed"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag}
              </span>
            ))}
          </div>
          <Checkbox
            inputName="artist"
            onChange={() => setUserAsArist(!userAsArtist)}
            checked={userAsArtist}
            label="I am the artist of this artwork"
          />
        </div>
      </section>
      <div className="flex flex-row items-center justify-end p-4">
        <Button className="x-4 float-right" onClick={uploadArt}>
          Upload Art
        </Button>
      </div>
    </Modal>
  )
}
