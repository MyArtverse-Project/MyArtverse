import { dashboardSidebarToggle } from "@/atoms"
import clsx from "clsx"
import { useAtom } from "jotai"
import { LuPencil } from "react-icons/lu"
import { Button } from "../ui/Buttons"
import MFImage from "../ui/MFImage"

export default function SidebarProfile() {
  const [isToggled] = useAtom(dashboardSidebarToggle)

  return (
    <div
      className={clsx(
        "font-inter flex items-center gap-x-2.5 gap-y-3.5 overflow-hidden rounded-md bg-opacity-75 transition-[margin,padding,background-color] duration-[420ms] ease-in-out",
        isToggled ? "bg-300 mb-3 px-4 py-2.5" : "hover:bg-300 mb-0 px-3.5 py-1"
      )}
    >
      <span
        className={clsx(
          "flex-shrink-0 transition-[width] duration-[420ms] ease-in-out",
          isToggled ? "w-10" : "w-8"
        )}
      >
        <MFImage
          src="/img/examples/kuro/kuro-example4.png"
          aspectRatio="1"
          width="100%"
          height="100%"
          rounded={999}
        />
      </span>
      <span className="flex w-full flex-col">
        <span className="-mb-0.5 text-lg font-bold">Name</span>
        <span className="text-subtext text-xs">@Handle</span>
      </span>
      <span className="flex-shrink-0">
        <Button iconOnly variant="tritery" size="small">
          <LuPencil size={18} />
        </Button>
      </span>
    </div>
  )
}
