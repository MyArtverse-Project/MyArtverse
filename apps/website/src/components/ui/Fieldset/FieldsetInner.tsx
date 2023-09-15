import React from "react"

export default function FieldsetInner({
  children
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="bg-100 p-3.5 border border-300 rounded-lg">{children}</div>
  )
}
