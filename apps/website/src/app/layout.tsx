import "./globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

import dynamic from "next/dynamic"
import { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Open_Sans } from "next/font/google"

import { config } from "@fortawesome/fontawesome-svg-core"
import { Footer, Navbar } from "@/components/Base"
import NoJSReminder from "@/components/NoJSReminder"
import SkipNav from "@/components/SkipNav"
import Analytics from "@/components/Base/Analytics"
import Providers from "@/context/Providers"

config.autoAddCss = false

const Sidebar = dynamic(
  () => import("@/components/Base").then((c) => c.Sidebar),
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
  robots: "noai, noimageai"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const CONTRIB_MSG = `
    console.log(
      "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project",
      "color: hsl(250, 95.5%, 75%)"
    )
  `

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
          dangerouslySetInnerHTML={{ __html: CONTRIB_MSG }}
        />
        <Analytics nonce={nonce} />
      </head>
      <Providers>
        <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter">
          {/* Skip nav accessibility */}
          <SkipNav />
          <NoJSReminder />
          {/* Platform announcements sent through the API goes here */}
          <div id="myfursona-announcements"></div>
          <div
            id="myfursona-app"
            className="text-sm font-medium contents font-open-sans"
          >
            <header className="sticky top-0 z-10">
              <Navbar />
              <Sidebar />
            </header>
            <main id="skip-navigation">{children}</main>
            <Footer />
          </div>
        </body>
      </Providers>
    </html>
  )
}
