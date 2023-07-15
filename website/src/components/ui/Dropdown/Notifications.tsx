import { BellIcon, CheckCheckIcon, SettingsIcon } from "lucide-react"
import Dropdown from "./Dropdown"
import DropdownButton from "./DropdownButton"
import { ChildrenNode } from "@/types"
import Button from "../Buttons/Button"

interface NotificationsWindowProps extends ChildrenNode {}

export default function Notifications(props: NotificationsWindowProps) {
  return (
    <Dropdown
      right
      id="notifications"
      buttonChild={
        <DropdownButton iconOnly variant="secondary" aria-label="Notifications">
          <BellIcon size={20} />
        </DropdownButton>
      }
    >
      <div
        id="notification-window"
        className="flex flex-col w-[480px] h-[500px]"
      >
        <div className="mx-1 border-b-2 border-red-200">
          <div className="flex items-center justify-between px-2 pb-1.5">
            <h1 className="text-base font-semibold">Notifications</h1>
            <div className="flex gap-x-1.5">
              <Button iconOnly variant="secondary">
                <SettingsIcon size={21} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid flex-1 p-2">{props.children}</div>
      </div>
    </Dropdown>
  )
}
