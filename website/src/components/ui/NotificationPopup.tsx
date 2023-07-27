import { Popover } from "@headlessui/react"
import { Button } from "./Buttons"
import { BellIcon } from "lucide-react"
import TransitionWrapper from "./TransitionWrapper"

export default function NotificationPopup() {
  return (
    <Popover className="relative z-10">
      <Popover.Button
        as={Button}
        iconOnly
        variant="secondary"
        aria-label="Notifications"
      >
        <BellIcon size={20} />
      </Popover.Button>
      <TransitionWrapper>
        <Popover.Panel
          className="absolute border bg-white border-red-300 rounded-md top-2.5 right-0 shadow-md flex flex-col"
          style={{ width: 400, height: 400 }}
        >
          <div className="px-3 py-2">
            <h1 className="text-lg font-bold">Notifications</h1>
          </div>
          <div id="notifications-wrapper" className="h-full"></div>
        </Popover.Panel>
      </TransitionWrapper>
    </Popover>
  )
}
