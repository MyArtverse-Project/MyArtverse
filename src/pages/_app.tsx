import { config } from "@fortawesome/fontawesome-svg-core"
import Layout from "@/components/Layout"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
