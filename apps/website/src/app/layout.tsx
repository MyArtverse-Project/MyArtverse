import "./globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { Metadata } from "next"
import { Inter, Open_Sans } from "next/font/google"
import dynamic from "next/dynamic"

import { config } from "@fortawesome/fontawesome-svg-core"

import type { IncludeReactNode } from "@/types"
import { Footer, Navbar } from "@/components/Base"
import { NavbarProvider } from "@/context/NavbarContext"
import NoJSReminder from "@/components/NoJSReminder"
import Provider from "@/context/Provider"
import SkipNav from "@/components/SkipNav"

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

export default function RootLayout({ children }: IncludeReactNode) {
  const CONTRIB_MSG = `
    console.log("%c✨ Are you looking to improve MyFursona? If you're a developer, you can help!", "color: hsl(250, 95.5%, 75%)")
    console.log("🦊 The code, including this website, is open-source! https://github.com/MyFursona-Project")
  `

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${open_sans.variable} theme-system`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONTRIB_MSG }} />
      </head>
      <Provider>
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
            <NavbarProvider>
              <header className="sticky top-0 z-10">
                <Navbar />
                <Sidebar />
              </header>
              <main id="skip-navigation">{children}</main>
              <Footer />
            </NavbarProvider>
          </div>
        </body>
      </Provider>
    </html>
  )
}
