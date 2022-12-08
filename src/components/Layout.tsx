import Header from "./Layouts/Header"
import Footer from "./Layouts/Footer"
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
