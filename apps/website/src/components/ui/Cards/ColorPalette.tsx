import type { ColorPalette } from "@/types"

export default function ColorPalette({
  palette,
  width = 100
}: {
  palette: ColorPalette[]
  width?: number | string
}) {
  return (
    <ul data-palette="" className="grid grid-flow-col" style={{ width }}>
      {palette.map(({ color, name }, index) => {
        return (
          <li key={index}>
            <div
              aria-label={name}
              tabIndex={-1}
              style={{ backgroundColor: color }}
            />
          </li>
        )
      })}
    </ul>
  )
}
