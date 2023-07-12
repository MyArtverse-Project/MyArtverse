import { ColorPalette } from "@/types"

interface ColorPaletteProps {
  palette: ColorPalette[]
  width?: number | string
}

export default function ColorPalette(props: ColorPaletteProps) {
  const { palette, width = 100 } = props

  return (
    <ul className="grid grid-flow-col" style={{ width }}>
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
