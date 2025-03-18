import "@mav/shared/styles/index.scss"
import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import { Analytics, NoJSMessage, SkipNav } from "@/components"
import { BRAND } from "@mav/shared"
import { cn } from "@mav/shared/utils"
import { Provider } from "jotai"
import PreconnectResources from "./preconnect-resources"
import { AuthProvider } from "@/app/context/AuthContext"

const CheckLocalSettings = dynamic(() =>
  import("@/components").then((c) => c.CheckLocalSettings),
)

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  preload: true,
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    template: `%s - ${BRAND}`,
    default: BRAND,
  },
  formatDetection: { telephone: false, address: false },
  // prettier-ignore
  keywords: ["fur", "furries", "furry", "fursona", "mascot", "furry fandom", "toyhouse", "furaffinity", "fur affinity", "weasyl"],
  openGraph: {
    type: "website",
    siteName: BRAND,
  },
  other: {
    "apple-mobile-web-app-status-bar": "#9e00ff",
  },
}

export const viewport: Viewport = {
  themeColor: "#9e00ff",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" dir="ltr" className={cn(inter.variable, "theme-system")}>
      <head>
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="9e00ff" />
      </head>
      <body className="bg-100 text-700 bg-background prose-headings:font-bold font-inter !overflow-x-hidden text-sm font-medium">
        <Analytics />
        <PreconnectResources />
        <CheckLocalSettings />
        <div data-mav-root-layout-slot="" className="contents">
          <SkipNav />
          <NoJSMessage />
          <Provider>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        </div>
      </body>
    </html>
  )
}
