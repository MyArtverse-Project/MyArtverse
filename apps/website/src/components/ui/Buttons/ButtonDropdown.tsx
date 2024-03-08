"use client"

import Button from "./Button"

export default function ButtonDropdown({
  button,
  disableDropdown
}: Partial<{ button: NonNullable<React.ReactElement>; disableDropdown: boolean }>) {
  return (
    <div className="flex">
      {button}
      <Button disabled={disableDropdown} />
    </div>
  )
}
