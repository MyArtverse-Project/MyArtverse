import React from "react"
import { Menu } from "@headlessui/react"
import TransitionWrapper from "../TransitionWrapper"

export default function Dropdown({
  button,
  items
}: {
  button: React.ReactElement
  items?: React.ReactElement
}) {
  return (
    <Menu>
      <div className="relative z-10">
        <Menu.Button as={React.Fragment}>{button}</Menu.Button>
        <TransitionWrapper>
          <Menu.Items className="absolute border bg-white border-red-300 rounded-md top-2.5 p-2 right-0 grid shadow-md">
            {items}
          </Menu.Items>
        </TransitionWrapper>
      </div>
    </Menu>
  )
}
