import { isAllowedImageUrl } from "@/lib/productionOrigins"
import { quantizeImageColors } from "@/utils/quantizeImageColors"
import { NextResponse } from "next/server"
import sharp from "sharp"

export const runtime = "nodejs"
export const maxDuration = 30

const SAMPLE_SIZE = 80
const MAX_COLORS = 16

export async function POST(request: Request) {
  let body: { url?: string; maxColors?: number }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const url = body.url?.trim()
  if (!url) {
    return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
  }

  if (!isAllowedImageUrl(url)) {
    return NextResponse.json({ error: "Image URL is not allowed" }, { status: 400 })
  }

  const maxColors = Math.min(
    Math.max(body.maxColors ?? 8, 1),
    MAX_COLORS
  )

  try {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: 502 }
      )
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    const { data } = await sharp(buffer)
      .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "fill" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })

    const pixels = new Uint8ClampedArray(
      data.buffer,
      data.byteOffset,
      data.byteLength
    )
    const colors = quantizeImageColors(pixels, maxColors)
    return NextResponse.json({ colors })
  } catch {
    return NextResponse.json(
      { error: "Failed to extract colors" },
      { status: 500 }
    )
  }
}
