import { createPortal } from "react-dom"
import type { IncludeReactNode } from "@/types"

export default function Portal({ children }: IncludeReactNode) {
  return createPortal(<div data-portal="">{children}</div>, document.body)
}
