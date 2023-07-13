import { createPortal } from "react-dom"

import type { ChildrenNode } from "@/types"

export default function Portal(props: ChildrenNode) {
  return createPortal(<mf-portal>{props.children}</mf-portal>, document.body)
}
