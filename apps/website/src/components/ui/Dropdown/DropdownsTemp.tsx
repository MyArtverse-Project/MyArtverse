import React from "react"
import { Button } from "../Buttons"
import type { LucideIcon } from "lucide-react"

export default function DropdownsTemp({
  button,
  items
}: {
  button: NonNullable<React.ReactElement>
  items: Array<
    Partial<{
      icon: LucideIcon
      name: string
      link: string
      event: () => any
      suffix: NonNullable<React.ReactElement> | string | number
    }>
  >
}) {
  return <button></button>
}

function lol() {
  return (
    <DropdownsTemp
      button={<button></button>}
      items={[
        { name: "Filter content" },
        { name: "Report issue to Github" },
        { name: "owo" }
      ]}
    />
  )
}
