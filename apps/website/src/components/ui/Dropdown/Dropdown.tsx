import { Fragment } from "react"
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
    <Menu as="div" className="relative z-[4]">
      <Menu.Button as={Fragment}>{button}</Menu.Button>
      <TransitionWrapper>
        <Menu.Items className="absolute z-[9] border bg-context-menu border-300 rounded-md top-2.5 p-2 right-0 grid shadow-md">
          {items}
        </Menu.Items>
      </TransitionWrapper>
    </Menu>
  )
}
