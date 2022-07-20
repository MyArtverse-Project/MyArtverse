import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return <div className="container">{children}</div>
}
