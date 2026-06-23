import { getChangelog } from "@/lib/changelog"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export function GET() {
  const { version, title } = getChangelog()

  return NextResponse.json({ version, title })
}
