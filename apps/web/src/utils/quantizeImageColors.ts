const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`

const colorDistance = (a: number[], b: number[]) =>
  (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2

export function quantizeImageColors(
  data: Uint8ClampedArray,
  maxColors = 8
): string[] {
  const buckets = new Map<string, { rgb: number[]; count: number }>()

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]

    if (a < 128) continue

    const qr = Math.round(r / 24) * 24
    const qg = Math.round(g / 24) * 24
    const qb = Math.round(b / 24) * 24
    const key = `${qr},${qg},${qb}`

    const existing = buckets.get(key)
    if (existing) {
      existing.count += 1
    } else {
      buckets.set(key, { rgb: [qr, qg, qb], count: 1 })
    }
  }

  const sorted = [...buckets.values()]
    .filter(({ rgb }) => {
      const brightness = (rgb[0] + rgb[1] + rgb[2]) / 3
      return brightness > 20 && brightness < 245
    })
    .sort((a, b) => b.count - a.count)

  const picked: number[][] = []

  for (const bucket of sorted) {
    if (picked.length >= maxColors) break
    const tooClose = picked.some(
      (color) => colorDistance(color, bucket.rgb) < 900
    )
    if (!tooClose) picked.push(bucket.rgb)
  }

  return picked.map(([r, g, b]) => rgbToHex(r, g, b))
}
