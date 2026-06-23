import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { ScrollTitleProvider } from "./ScrollTitleContext"
import { getApiCommit } from "@/utils/buildInfo"

export default async function AppLayout(props: React.PropsWithChildren) {
  const apiCommit = await getApiCommit()

  return (
    <ScrollTitleProvider>
      <Navbar />
      <main className="min-h-[calc(100dvh-3.75rem)]" id="skip-to-content">
        {props.children}
      </main>
      <Footer apiCommit={apiCommit} />
    </ScrollTitleProvider>
  )
}
