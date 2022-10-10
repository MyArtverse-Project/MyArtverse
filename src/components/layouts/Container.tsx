import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>
}
