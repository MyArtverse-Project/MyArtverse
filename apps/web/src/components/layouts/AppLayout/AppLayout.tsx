import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { ScrollTitleProvider } from "./ScrollTitleContext"

export default function AppLayout(props: React.PropsWithChildren) {
  return (
    <ScrollTitleProvider>
      <Navbar />
      <main className="min-h-[calc(100dvh-3.75rem)]" id="skip-to-content">
        {props.children}
      </main>
      <Footer />
    </ScrollTitleProvider>
  )
}
