import { config } from "@fortawesome/fontawesome-svg-core"
import Layout from "@/components/Layout"
import { SessionProvider } from "next-auth/react"
import "@/styles/globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { AppProps } from "next/app"
import { NextPage } from "next"

config.autoAddCss = false

type AppPropsWithLayout = AppProps & {
  Component: NextPage
}

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
