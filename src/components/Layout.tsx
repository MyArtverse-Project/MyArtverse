import Footer from "./Layouts/Footer"
import Navbar from "./Layouts/Navbar/Navbar"
import UnderConstruction from "./UnderConstruction"

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <UnderConstruction />
      <Navbar />
      {props.children}
      <Footer />
    </>
  )
}
