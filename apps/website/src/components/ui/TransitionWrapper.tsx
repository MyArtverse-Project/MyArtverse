import { Transition } from "@headlessui/react"

export default function TransitionWrapper({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <Transition
      data-transition-wrapper=""
      enter="transition duration-[200ms] ease"
      enterFrom="transform -translate-y-1 opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-[200ms] ease"
      leaveTo="transform -translate-y-1 opacity-0"
    >
      {children}
    </Transition>
  )
}
