import "./globals.scss"
import "@fortawesome/fontawesome-svg-core/styles.css"

import dynamic from "next/dynamic"
import { Metadata } from "next"
import { headers } from "next/headers"
import { Inter, Open_Sans } from "next/font/google"

import { config } from "@fortawesome/fontawesome-svg-core"
import { Footer, Navbar } from "@/components/base"
import SkipNav from "@/components/base/SkipNav"
import Analytics from "@/components/base/Analytics"
import Providers from "@/context/Providers"
import NoJSReminder from "@/components/base/NoJSReminder"

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
  robots: "noai, noimageai"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const CONSOLE_MSG =
    "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"
  const COMMENT_MSG = "Whatcha lookin at? OwO"

  const DEV_CONVERSION_INLINE_SCRIPT = `
    (function(m,s,a){
      const __d=document;__d.insertBefore(__d.createComment(a),__d.childNodes[0]);console.log(m, s)
    })("${CONSOLE_MSG}","color: hsl(250, 95.5%, 75%)", "${COMMENT_MSG}")
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
          dangerouslySetInnerHTML={{ __html: DEV_CONVERSION_INLINE_SCRIPT }}
        />
        <Analytics nonce={nonce} />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter">
        <Providers>
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
        </Providers>
      </body>
    </html>
  )
}
