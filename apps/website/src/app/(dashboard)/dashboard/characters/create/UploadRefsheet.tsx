import { Button } from "@/components/ui/Buttons"
import DropZone from "@/components/ui/Drop/DropZone"
import { InputField } from "@/components/ui/Forms"
import Modal from "@/components/ui/Modal"
import { FaFolderPlus } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"

export default function UploadRefsheet({
  toggleUploadRefSheetModal,
  uploadRefsheetModal,
  newRefSheetData
}: {
  toggleUploadRefSheetModal: () => void
  uploadRefsheetModal: boolean
  // TODO: Figire out the type for newRefSheetData
  newRefSheetData: unknown
}) {
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
      <section className="px-4">
        <DropZone setData={newRefSheetData} />
        <div className="w-1/2">
          <InputField inputName="Ref Sheet" required />
        </div>
      </section>
    </Modal>
  )
}
