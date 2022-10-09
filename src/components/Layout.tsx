import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import UnderConstruction from "./UnderConstruction"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <UnderConstruction />
      <Header />
      {children}
      <Footer />
    </>
  )
}
