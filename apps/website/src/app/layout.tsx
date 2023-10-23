import type { Metadata } from "next"
import { Inter, Open_Sans } from "next/font/google"
import "@myfursona/biro-ui/styles/globals.scss"
import "react-quill/dist/quill.snow.css"
import { ClientInit, Analytics, MyFursonaApp } from "@/components/base"
import Providers from "@/context"

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
  themeColor: "#9e00ff",
  other: {
    "apple-mobile-web-app-status-bar": "#9e00ff",
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
        <link rel="preconnect" href="https://images.ctfassets.net/" />
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="9e00ff" />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter text-sm font-medium font-open-sans prose-h1:text-5xl prose-h2:text-[2.75rem] prose-h3:text-4xl prose-h4:text-[2rem] prose-h5:text-[1.65rem]">
        <Analytics />
        <ClientInit />
        <Providers>
          <MyFursonaApp>{children}</MyFursonaApp>
        </Providers>
      </body>
    </html>
  )
}
