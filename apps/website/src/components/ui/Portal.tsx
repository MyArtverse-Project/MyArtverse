import { createPortal } from "react-dom"

export default function Portal({ children }: { children?: React.ReactNode }) {
  return createPortal(<div id="biro-ui-portal">{children}</div>, document.body)
}
