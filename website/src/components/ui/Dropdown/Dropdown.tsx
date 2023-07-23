import React from "react"
import { Menu, Transition } from "@headlessui/react"

export default function Dropdown({
  button,
  items
}: {
  button: React.ReactElement
  items?: React.ReactElement
}) {
  return (
    <Menu>
      <div className="relative">
        <Menu.Button as={React.Fragment}>{button}</Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform opacity-0"
        >
          <Menu.Items className="absolute border bg-white border-red-300 rounded-md top-2.5 p-2 right-0 grid shadow-md">
            {items}
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  )
}
