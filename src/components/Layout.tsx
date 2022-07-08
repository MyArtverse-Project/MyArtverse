import { ReactChild } from "react"
import Header from "./Header"
// import Footer from "./Footer"

interface Props {
  children: ReactChild
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      {/* <Footer /> */}
    </>
  )
}
