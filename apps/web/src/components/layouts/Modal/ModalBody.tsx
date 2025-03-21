import React from "react"

export default function ModalBody({ children }: { children?: React.ReactNode }) {
  return <div className="flex flex-col gap-y-1 px-4 pb-3">{children}</div>
}
