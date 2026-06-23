import { quantizeImageColors } from "./quantizeImageColors"

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error("Failed to load image for color extraction"))
    img.src = src
  })

async function extractImageColorsClient(
  src: string,
  maxColors = 8
): Promise<string[]> {
  const img = await loadImage(src)
  const canvas = document.createElement("canvas")
  const size = 80
  canvas.width = size
  canvas.height = size

  const ctx = canvas.getContext("2d")
  if (!ctx) return []

  ctx.drawImage(img, 0, 0, size, size)
  const { data } = ctx.getImageData(0, 0, size, size)

  return quantizeImageColors(data, maxColors)
}

async function extractImageColorsViaApi(
  src: string,
  maxColors = 8
): Promise<string[]> {
  const res = await fetch("/api/extract-colors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: src, maxColors }),
    credentials: "same-origin",
  })

  if (!res.ok) {
    throw new Error("Server color extraction failed")
  }

  const payload = (await res.json()) as { colors?: string[] }
  return payload.colors ?? []
}

function shouldUseServerExtraction(src: string) {
  if (src.startsWith("blob:") || src.startsWith("data:")) return false

  try {
    const { protocol } = new URL(src)
    return protocol === "http:" || protocol === "https:"
  } catch {
    return false
  }
}

export async function extractImageColors(
  src: string,
  maxColors = 8
): Promise<string[]> {
  if (typeof window !== "undefined" && shouldUseServerExtraction(src)) {
    try {
      return await extractImageColorsViaApi(src, maxColors)
    } catch {
      // Fall back to client extraction when the API is unavailable.
    }
  }

  return extractImageColorsClient(src, maxColors)
}
