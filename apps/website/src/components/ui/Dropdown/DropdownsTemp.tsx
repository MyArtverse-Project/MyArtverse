import { Button } from "../Buttons"
import type { IconType } from "react-icons"

export default function DropdownsTemp({
  button,
  items
}: {
  button: NonNullable<React.ReactElement>
  items: Array<
    Partial<{
      icon: IconType
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
      items={[{ name: "Filter content" }, { name: "Report issue to Github" }, { name: "owo" }]}
    />
  )
}
