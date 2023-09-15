import React from "react"

export default function GridResponsive({
  children,
  constraint = "auto-fill",
  breakpoint = 270,
  ...attrs
}: {
  children?: React.ReactNode
  constraint?: "auto-fill" | "auto-fit"
  breakpoint?: number
} & Pick<React.HTMLAttributes<HTMLDivElement>, "className" | "role">) {
  if (attrs.className.includes("flex")) {
    throw new Error(
      `"flex" className detected on a grid component; remove it or use a <div> element instead.`
    )
  }

  if (attrs.className.includes("grid")) {
    throw new Error(
      `"grid" className detected and already applied! Either remove it or use a <div> element instead.`
    )
  }

  return (
    <div
      id="grid-responsive-wrapper"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${constraint}, minmax(${breakpoint}px, 1fr))`
      }}
      {...attrs}
    >
      {children}
    </div>
  )
}
