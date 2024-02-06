import type { Metadata, Viewport } from "next"
import { Inter, Open_Sans } from "next/font/google"
import "@myfursona/biro-ui/styles/globals.scss"
import "react-quill/dist/quill.snow.css"
import { ClientInit, Analytics, MyFursonaApp } from "@/components/base"
import Providers from "@/context"
import clsx from "clsx"

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
  formatDetection: { telephone: false, address: false },
  keywords: [
    "fur",
    "furries",
    "furry",
    "fursona",
    "mascot",
    "furry fandom",
    "toyhouse",
    "furaffinity",
    "fur affinity",
    "weasyl"
  ],
  openGraph: {
    type: "website",
    siteName: "MyFursona"
  },
  robots: "noai, noimageai, noindex, nofollow",
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-status-bar": "#9e00ff"
  }
}

export const viewport: Viewport = {
  themeColor: "#9e00ff"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={clsx(
        inter.variable,
        open_sans.variable,
        "theme-system",
        "a11y-animations-all",
        "a11y-high-contrast-off"
      )}
    >
      <head>
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="9e00ff" />
        <Analytics />
      </head>
      <body className="bg-100 text-700 !overflow-x-hidden bg-background prose-headings:font-bold prose-headings:font-inter text-sm font-medium font-open-sans">
        <Providers>
          <ClientInit />
          <MyFursonaApp>{children}</MyFursonaApp>
        </Providers>
      </body>
    </html>
  )
}
