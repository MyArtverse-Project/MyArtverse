import "./globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

import { Inter, Open_Sans } from "next/font/google"
import dynamic from "next/dynamic"

import { config } from "@fortawesome/fontawesome-svg-core"

import type { IncludeReactNode } from "@/types"
import { Footer, Navbar } from "@/components/Base"
import { NavbarProvider } from "@/context/NavbarContext"
import NoJSReminder from "@/components/NoJSReminder"
import { SessionProvider } from "next-auth/react"
import Provider from "@/context/Provider"
import SkipNav from "@/components/SkipNav"

config.autoAddCss = false

const Sidebar = dynamic(() =>
  import("@/components/Base").then((c) => c.Sidebar)
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

export default function RootLayout({ children }: IncludeReactNode) {
  const CONTRIB_MSG = `
    console.log("%c✨ Are you looking to improve MyFursona? If you're a developer, you can help!", "color: hsl(250, 95.5%, 75%)")
    console.log("🦊 The code, including this website, is open-source! https://github.com/MyFursona-Project")
  `

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${open_sans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONTRIB_MSG }} />
      </head>
      <Provider>
        <body className="!overflow-x-hidden bg-background">
          {/* SVG defs for complex gradients */}
          <svg
            style={{ position: "absolute", height: 0, width: 0 }}
            aria-hidden
          >
            <defs></defs>
          </svg>
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
              <NavbarProvider>
                <Navbar />
                <Sidebar />
              </NavbarProvider>
            </header>
            <main id="skip-navigation">{children}</main>
            <Footer />
          </div>
        </body>
      </Provider>
    </html>
  )
}
