import type { ReactMapElement } from "@/types/utils"

export default function GridResponsive({
  children,
  constraint = "auto-fill",
  breakpoint = 270,
  ...attrs
}: {
  children?: React.ReactNode
  constraint?: "auto-fill" | "auto-fit"
  breakpoint?: number
} & Pick<ReactMapElement<"div">, "className" | "role">) {
  const BREAKPOINT_MAX_RANGE = 300
  const BREAKPOINT_MIN_RANGE = 110

  const bpRange = `the breakpoint's range is between ${BREAKPOINT_MIN_RANGE}-${BREAKPOINT_MAX_RANGE}`

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

  if (breakpoint > BREAKPOINT_MAX_RANGE) {
    throw new Error(`Bruh too b i g;  ${bpRange}`)
  }

  if (breakpoint < BREAKPOINT_MIN_RANGE) {
    throw new Error(`Bruh too narrow!!!11! ${bpRange}`)
  }

  return (
    <div
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
