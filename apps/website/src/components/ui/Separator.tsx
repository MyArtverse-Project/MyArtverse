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
    horizontal: { width: size },
    vertical: { height: size }
  }

  const directionMapPadding: Record<DirectionType, CSSProperties> = {
    horizontal: { marginTop: padding, marginBottom: padding },
    vertical: { marginLeft: padding, marginRight: padding }
  }

  return (
    <div
      className="block border border-b-0 border-l-0 opacity-70 border-separator"
      style={{ ...directionMapSize[dir], ...directionMapPadding[dir] }}
    />
  )
}
