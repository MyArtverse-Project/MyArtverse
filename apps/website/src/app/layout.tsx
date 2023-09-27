import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Inter, Open_Sans } from "next/font/google"
import "@myfursona/biro-ui/styles/globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import Providers from "@/context"
import {
  ClientInit,
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
  keywords: [
    "fur",
    "furries",
    "furry",
    "fursona",
    "mascot",
    "furry fandom",
    "toyhouse",
    "furaffinity",
    "weasyl"
  ],
  openGraph: {
    type: "website",
    siteName: "MyFursona"
  },
  robots: "noai, noimageai, noindex, nofollow",
  manifest: "/manifest.json",
  themeColor: "#7300ff",
  other: {
    "apple-mobile-web-app-status-bar": "#7300ff",
    copyright: "Fusky Labs Software"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${open_sans.variable} theme-system`}
    >
      <head>
        <link rel="preconnect" href="https://api.myfursona.art/" />
        <link rel="preconnect" href="https://i-r2.myfursona.art/" />
        <link rel="preconnect" href="https://images.ctfassets.net/" />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter text-sm font-medium font-open-sans prose-h1:text-5xl prose-h2:text-[2.75rem] prose-h3:text-4xl prose-h4:text-[2rem] prose-h5:text-[1.65rem]">
        <SkipNav />
        <NoJSReminder />
        {/* Platform announcements sent through the API goes here */}
        <div id="announcements"></div>
        <Providers>
          <header className="sticky top-0 z-20">
            <Navbar />
            <Sidebar />
          </header>
          <div id="skip-navigation" className="min-h-[calc(100dvh-4rem)]">
            {children}
          </div>
          <Footer />
        </Providers>
        <Analytics />
        <ClientInit />
      </body>
    </html>
  )
}
