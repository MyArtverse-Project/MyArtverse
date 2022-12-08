import Header from "./Layouts/Header"
import Footer from "./Layouts/Footer"
import UnderConstruction from "./UnderConstruction"

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <UnderConstruction />
      <Header />
      {props.children}
      <Footer />
    </>
  )
}
