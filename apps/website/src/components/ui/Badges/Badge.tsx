import { LucideIcon } from "lucide-react"
import React from "react"

export default function Badge({
  label,
  prefixIcon,
  varient = "default"
}: {
  label: string
  prefixIcon: React.ReactElement<LucideIcon>
  varient: "warning" | "info" | "danger" | "default"
}) {
  let borderStyle =
    varient === "default"
      ? "border-700"
      : varient === "warning"
      ? "border-warning"
      : varient === "info"
      ? "border-info"
      : varient === "danger"
      ? "border-error"
      : "border-100"
  let backgroundColor =
    varient === "default"
      ? "bg-100"
      : varient === "warning"
      ? "bg-warning"
      : varient === "info"
      ? "bg-info"
      : varient === "danger"
      ? "bg-error"
      : "bg-100"
  let textColor =
    varient === "default"
      ? "text-700"
      : varient === "warning"
      ? "text-warning"
      : varient === "info"
      ? "text-info"
      : varient === "danger"
      ? "text-error"
      : "text-100"
  return (
    <div
      className={`inline-flex items-center gap-x-1.5 px-2 py-1 mx-2 rounded-md border border-solid ${borderStyle} ${backgroundColor} ${textColor}`}
    >
      {prefixIcon}
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}
