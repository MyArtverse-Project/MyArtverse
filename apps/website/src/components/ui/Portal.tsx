import { createPortal } from "react-dom"
import type { IncludeReactNode } from "@/types"

export default function Portal({ children }: IncludeReactNode) {
  return createPortal(
    <bui-portal>{children}</bui-portal>,
    document.body
  )
}
