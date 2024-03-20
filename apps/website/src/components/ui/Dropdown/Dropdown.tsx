/* eslint-disable import/no-internal-modules */
import { Menu } from "@headlessui/react"
import { Fragment } from "react"
import TransitionWrapper from "../Layouts/TransitionWrapper"

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
        <Menu.Items className="bg-context-menu border-300 absolute right-0 top-2.5 z-[9] grid rounded-md border p-2 shadow-md">
          {items}
        </Menu.Items>
      </TransitionWrapper>
    </Menu>
  )
}
