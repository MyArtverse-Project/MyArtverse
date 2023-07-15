import { CSSProperties } from "react"

type DirectionType = "horizontal" | "vertical"

interface SeparatorProps {
  dir: DirectionType
  size?: string | number
  padding?: string | number
}

export default function Separator(props: SeparatorProps) {
  const { dir, size, padding } = props

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
      className="block border border-red-100"
      style={{ ...directionMapSize[dir], ...directionMapPadding[dir] }}
    />
  )
}
