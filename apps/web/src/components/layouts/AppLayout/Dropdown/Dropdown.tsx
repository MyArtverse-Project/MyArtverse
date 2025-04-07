/* eslint-disable import/no-internal-modules */
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function Dropdown({
  button,
  items
}: {
  button: React.ReactElement
  items?: React.ReactElement
}) {
  return (
    <Menu as="div" className="relative z-[4]">
      <MenuButton as={Fragment}>{button}</MenuButton>
      <Transition
        enter="transition duration-[200ms] ease"
        enterFrom="transform -translate-y-1 opacity-0"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition duration-[200ms] ease"
        leaveTo="transform -translate-y-1 opacity-0"
        leaveFrom="transform translate-y-0 opacity-100"
        // @ts-expect-error
        className="translate-x-0"
      >
        <MenuItems className="bg-context-menu border-300 absolute right-0 top-7 z-[9] grid rounded-md border p-2 shadow-md">
          {items}
        </MenuItems>
      </Transition>
    </Menu>
  )
}
