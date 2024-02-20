import type { Metadata } from "next"
import { BRAND } from "@myfursona-internal/config"

export default function MetaOverride(title: string): Metadata {
  return {
    title: {
      absolute: `${title} | ${BRAND} Studio`
    }
  }
}
