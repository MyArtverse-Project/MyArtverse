import { createPortal } from "react-dom"

interface PortalProps {
  style?: React.CSSProperties
}

export function Portal(props: React.PropsWithChildren<PortalProps>) {
  return createPortal(
    <div data-mav-portal="" style={props.style ?? undefined}>
      {props.children}
    </div>,
    document.body
  )
}
