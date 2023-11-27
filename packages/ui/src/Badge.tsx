import * as React from "react"
import clsx from "clsx"
import type { IconType } from "react-icons"

export default function Badge({
  label,
  prefixIcon,
  variant = "default"
}: {
  label: string
  prefixIcon: React.ReactElement<IconType>
  variant: "warning" | "info" | "danger" | "default"
}) {
  // TODO REFACTOR THIS TERNARY ABOMINATION INTO CVA
  let borderStyle =
    variant === "default"
      ? "border-700"
      : variant === "warning"
        ? "border-warning"
        : variant === "info"
          ? "border-info"
          : variant === "danger"
            ? "border-error"
            : "border-100"
  let backgroundColor =
    variant === "default"
      ? "bg-100"
      : variant === "warning"
        ? "bg-warning"
        : variant === "info"
          ? "bg-info"
          : variant === "danger"
            ? "bg-error"
            : "bg-100"
  let textColor =
    variant === "default"
      ? "text-700"
      : variant === "warning"
        ? "text-warning"
        : variant === "info"
          ? "text-info"
          : variant === "danger"
            ? "text-error"
            : "text-100"
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-x-1.5 px-2 py-1 mx-2 rounded-md border border-solid",
        borderStyle,
        backgroundColor,
        textColor
      )}
    >
      {prefixIcon}
      <span className="text-xs font-semibold">{label}</span>
    </div>
  )
}
