import { CSSProperties } from "react"

type DirectionType = "horizontal" | "vertical"

export default function Separator({
  dir,
  size,
  padding
}: {
  dir: DirectionType
  size?: string | number
  padding?: string | number
}) {
  const directionMapSize: Record<DirectionType, CSSProperties> = {
    horizontal: { height: size },
    vertical: { width: size }
  }

  const directionMapPadding: Record<DirectionType, CSSProperties> = {
    horizontal: { marginTop: padding, marginBottom: padding },
    vertical: { marginLeft: padding, marginRight: padding }
  }

  return (
    <span
      className="block border border-red-100"
      style={(directionMapSize[dir], directionMapPadding[dir])}
    />
  )
}
