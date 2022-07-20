import { ReactChild } from "react"
import Header from "./Header"
import Footer from "./Footer"
import UnderConstruction from "./UnderConstruction"

interface Props {
  children: ReactChild
}

export default function Layout({ children }: Props) {
  return (
    <>
      <UnderConstruction />
      <Header />
      {children}
      <Footer />
    </>
  )
}
