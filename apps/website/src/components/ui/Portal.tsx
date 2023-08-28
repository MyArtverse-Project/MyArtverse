import { createPortal } from "react-dom"

export default function Portal({ children }: { children?: React.ReactNode }) {
  return createPortal(<div id="bui-portal">{children}</div>, document.body)
}
