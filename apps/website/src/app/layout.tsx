import "@myfursona/biro-ui/styles/globals.scss"
import "react-quill/dist/quill.snow.css"
import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { Inter, Open_Sans } from "next/font/google"
import { NoJSReminder } from "@/components/base"
import cn from "@/utils/cn"
import { BRAND } from "@myfursona-internal/config"
import Analytics from "./Analytics"
import QueryClientWrapper from "./QueryClientWrapper"
import PreconnectResources from "./preconnect-resources"

const SecretMessage = dynamic(
  () => import("@/components/base").then((c) => c.SecretMessage),
  {
    ssr: false
  }
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
    template: `%s - ${BRAND}`,
    default: BRAND
  },
  formatDetection: { telephone: false, address: false },
  // prettier-ignore
  keywords: ["fur", "furries", "furry", "fursona", "mascot", "furry fandom", "toyhouse", "furaffinity", "fur affinity", "weasyl"],
  openGraph: {
    type: "website",
    siteName: BRAND
  },
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
      className={cn(
        inter.variable,
        open_sans.variable,
        "theme-system",
        "a11y-animations-all",
        "a11y-high-contrast-off"
      )}
    >
      <head>
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="9e00ff" />
        <PreconnectResources />
      </head>
      <body className="bg-100 text-700 bg-background prose-headings:font-bold prose-headings:font-inter font-open-sans !overflow-x-hidden text-sm font-medium">
        <div className="contents">
          <NoJSReminder />
          <SecretMessage />
          <QueryClientWrapper>{children}</QueryClientWrapper>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
