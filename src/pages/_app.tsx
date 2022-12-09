import "@/styles/globals.scss"
import type { AppProps } from "next/app"
import { NextPage } from "next"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { config } from "@fortawesome/fontawesome-svg-core"
import Layout from "@/components/Layout"
import "@fortawesome/fontawesome-svg-core/styles.css"

config.autoAddCss = false

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPage
}

export default function MyFursonaApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <style global jsx>{`
          @import "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap";
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
