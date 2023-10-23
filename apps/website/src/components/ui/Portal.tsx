import { createPortal } from "react-dom"

export default function Portal({ children }: { children?: React.ReactNode }) {
  return createPortal(<div data-portal="">{children}</div>, document.body)
}
