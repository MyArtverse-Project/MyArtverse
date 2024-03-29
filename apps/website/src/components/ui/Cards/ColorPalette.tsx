import type { ColorPalette as _ColorPalette } from "@/types/characters"

export default function ColorPalette({
  palette,
  width = "100%",
  height = "0.66rem"
}: {
  palette: _ColorPalette[]
  width?: number | string
  height?: number | string
}) {
  return (
    <ul className="grid grid-flow-col" style={{ width, height }}>
      {palette.map(({ color, name }, index) => {
        return <li key={index} aria-label={name} style={{ backgroundColor: color }}></li>
      })}
    </ul>
  )
}
