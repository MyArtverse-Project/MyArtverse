import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { headers } from "next/headers"
import { Inter, Open_Sans } from "next/font/google"
import "@myfursona-internal/ui/styles/globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import Providers from "@/context"
import {
  Analytics,
  Footer,
  Navbar,
  NoJSReminder,
  SkipNav
} from "@/components/base"

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
  robots: "noai, noimageai, noindex, nofollow",
  manifest: "/manifest.json",
  themeColor: "#080313",
  other: {
    "apple-mobile-web-app-status-bar": "#080313"
  }
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
        <link rel="apple-touch-icon" href="/logo-96x96.png" />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter text-sm font-medium font-open-sans prose-h1:text-5xl prose-h2:text-[2.75rem] prose-h3:text-4xl prose-h4:text-[2rem] prose-h5:text-[1.65rem]">
        <SkipNav />
        <NoJSReminder />
        {/* Platform announcements sent through the API goes here */}
        <div id="announcements"></div>
        <Providers>
          <header className="sticky top-0 z-10">
            <Navbar />
            <Sidebar />
          </header>
          <div id="skip-navigation" className="min-h-[calc(100dvh-4rem)]">
            {children}
          </div>
          <Footer />
        </Providers>
        <Analytics nonce={nonce} />
      </body>
    </html>
  )
}
