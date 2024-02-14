import type { Metadata } from "next"

export default function MetaOverride(title: string): Metadata {
  return {
    title: {
      absolute: `${title} - MyFursona Dashboard`
    }
  }
}
