/* eslint-disable import/no-internal-modules */
import { sidebarToggleDashboard } from "@/atoms"
import cn from "@/utils/cn"
import { useAtom } from "jotai"
import { LuPencil } from "react-icons/lu"
// import type { UserType } from "@/types/users"
import { Button } from "../ui/Buttons"
import MFImage from "../ui/MFImage"

export default function SidebarProfile() {
  const [isToggled] = useAtom(sidebarToggleDashboard)

  return (
    <div
      className={cn(
        "font-inter flex items-center gap-x-2.5 gap-y-3.5 overflow-hidden rounded-md bg-opacity-75 transition-[margin,padding,background-color] duration-[420ms] ease-in-out",
        isToggled ? "bg-300 mb-3 px-4 py-2.5" : "hover:bg-300 mb-0 px-3.5 py-1"
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 transition-[width] duration-[420ms] ease-in-out",
          isToggled ? "w-10" : "w-8"
        )}
      >
        <MFImage
          src={"/UserProfile.png"}
          aspectRatio="1"
          width="100%"
          height="100%"
          rounded={999}
        />
      </span>
      <span className="flex w-full flex-col">
        <span className="-mb-0.5 text-lg font-bold">{"temp"}</span>
        <span className="text-subtext text-xs">@{"temp"}</span>
      </span>
      <span className="flex-shrink-0">
        <Button icon={<LuPencil size={18} />} variant="tritery" size="small" />
      </span>
    </div>
  )
}
