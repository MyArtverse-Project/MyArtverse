import "../styles/globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

import dynamic from "next/dynamic"
import { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Open_Sans } from "next/font/google"

import { config } from "@fortawesome/fontawesome-svg-core"

import Providers from "@/context/Providers"
import {
  Analytics,
  Footer,
  Navbar,
  NoJSReminder,
  SkipNav
} from "@/components/base"
import { DEV_CONVERSION_INLINE_SCRIPT } from "@/constants"

config.autoAddCss = false

const Sidebar = dynamic(
  () => import("@/components/base").then((c) => c.Sidebar),
  { ssr: false }
)

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  preload: true,
  variable: "--font-inter"
})

const open_sans = Open_Sans({
  subsets: ["latin", "cyrillic-ext"],
  preload: true,
  variable: "--font-open-sans"
})

export const metadata: Metadata = {
  title: {
    template: "%s - MyFursona",
    default: "MyFursona"
  },
  keywords: ["fur", "furries", "furry", "fursona", "mascot", "furry fandom"],
  openGraph: {
    type: "website",
    siteName: "MyFursona"
  },
  robots: "noai, noimageai, noindex, nofollow"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const nonce = headersList.get("x-nonce")

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${open_sans.variable} theme-system`}
    >
      <head>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: DEV_CONVERSION_INLINE_SCRIPT }}
          defer
        />
        <Analytics nonce={nonce} />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter text-sm font-medium font-open-sans">
        <SkipNav />
        <NoJSReminder />
        <Providers>
          <div id="myfursona-app">
            {/* Platform announcements sent through the API goes here */}
            <div id="announcements"></div>
            <header className="sticky top-0 z-10">
              <Navbar />
              <Sidebar />
            </header>
            <main id="skip-navigation" className="min-h-[calc(100dvh-6rem)]">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
