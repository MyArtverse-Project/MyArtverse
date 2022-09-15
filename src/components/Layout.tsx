import Header from "./layouts/Header"
import Footer from "./layouts/Footer"
import UnderConstruction from "./UnderConstruction"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <UnderConstruction />
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout