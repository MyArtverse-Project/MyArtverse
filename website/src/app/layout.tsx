import "./globals.scss"
import { Inter, Open_Sans } from "next/font/google"
import dynamic from "next/dynamic"

import type { IncludeReactNode } from "@/types"
import { Navbar } from "@/components/Base"
import { NavbarProvider } from "@/components/Base/NavbarContext"

const Sidebar = dynamic(() =>
  import("@/components/Base").then((c) => c.Sidebar)
)
const Footer = dynamic(() => import("@/components/Base").then((c) => c.Footer))

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
        <script
          id="contrib-msg"
          dangerouslySetInnerHTML={{ __html: CONTRIB_MSG }}
        />
      </head>
      <body className="!overflow-x-hidden font-open-sans text-sm font-medium">
        <div id="__next">
          {/* Skip nav accessibility */}
          <a
            href="#skip-navigation"
            className="z-[999] rounded-2xl bg-white fixed top-3 left-2 px-5 py-1.5 opacity-0 pointer-events-none focus:pointer-events-auto focus:opacity-100"
            aria-label="Skip to content"
          >
            Skip to content
          </a>
          <NavbarProvider>
            <Navbar />
            <Sidebar />
          </NavbarProvider>
          <main id="skip-navigation">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
