"use client"

import { BACKEND_URL } from "@/utils/constants"
import { redirect } from "next/navigation"
import { useState } from "react"
import { FaTrash } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import { Button } from "@mav/ui/components/buttons"
import Note from "../layouts/Note"

export default function DeleteConfirmModal({
  toggleDeleteConfirmModal,
  deleteConfirmModal: uploadArtModal,
  characterId
}: {
  toggleDeleteConfirmModal: () => void
  deleteConfirmModal: boolean
  characterId: string
}) {
  const [errors, setErrors] = useState<string>()
  const deleteCharacter = async () => {
    const data = await fetch(`${BACKEND_URL}/v1/character/delete/${characterId}`, {
      method: "DELETE",
      credentials: "include"
    })

    if (data.ok) {
      toggleDeleteConfirmModal()
      return redirect("/dashboard/characters")
    }

    setErrors("An error occured while deleting the character")
  }

  return (
    <Modal
      className="w-1/4 px-4"
      toggler={toggleDeleteConfirmModal}
      state={uploadArtModal}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaTrash />
            Confirm Delete
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleDeleteConfirmModal}
          />
        </div>
      </Modal.Title>
      {errors && (
        <div className="my-3 px-4">
          <Note type="error">{errors}</Note>
        </div>
      )}
      <div className="flex flex-col gap-y-1 px-4 pb-3">
        <p>Are you sure you want to delete this character? (This is irreversable)</p>
      </div>
      <div className="flex flex-row items-center justify-end p-4">
        <Button variant="alert" className="x-4 float-right" onClick={deleteCharacter}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
