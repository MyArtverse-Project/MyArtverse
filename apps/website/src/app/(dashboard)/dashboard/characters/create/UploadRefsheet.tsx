import { MFImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import DropZone from "@/components/ui/Drop/DropZone"
import { InputField } from "@/components/ui/Forms"
import Checkbox from "@/components/ui/Forms/Checkbox"
import Modal from "@/components/ui/Modal"
import { FaFolderPlus } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"
import ModalRefVarient from "./ModalRefVarient"

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
      <section className="flex flex-row justify-around p-4">
        <DropZone setData={newRefSheetData} className="h-full w-2/5" />
        <div>
          <InputField inputName="Name" required />
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
              Additional Varients
            </span>
            <div className="border-400 hover:bg-400 relative flex flex-row justify-between rounded-md border border-solid px-3">
              <input
                type="file"
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
                  <span className="text-2xl">Upload a new varient</span>
                </div>
              </div>
            </div>
            <ModalRefVarient />
          </div>
        </div>
      </section>
      <Button className="float-right m-4">Save</Button>
    </Modal>
  )
}
