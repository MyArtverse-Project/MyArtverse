"use client"

import type { IconType } from "react-icons"

interface FolderViewShelfItemProps {
  type?: "default" | "nested" | "new"
  baseUrl?: string
  as?: "a" | "button"
  title: string
  prefix: IconType | React.ReactElement
}

export function FolderViewShelfItem(
  props: React.PropsWithChildren<FolderViewShelfItemProps>
) {
  const DynamicElement = props.as || "button"

  return <DynamicElement></DynamicElement>
}
