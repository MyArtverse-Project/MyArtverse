import "@mav/shared/styles/index.scss"
import "./theme.css"
import { AuthProvider } from "@/app/context/AuthContext"
import { NsfwPreferencesProvider } from "@/app/context/NsfwPreferencesContext"
import { Analytics, NoJSMessage, SkipNav } from "@/components"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/sonner"
import { config } from "@/utils/constants"
import { getSiteUrl } from "@/utils/metadata"
import { BRAND } from "@mav/shared"
import { Provider } from "jotai"
import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { Inter } from "next/font/google"
import PreconnectResources from "./preconnect-resources"

const CheckLocalSettings = dynamic(() =>
  import("@/components").then((c) => c.CheckLocalSettings)
)

const inter = Inter({
  subsets: ["latin", "cyrillic-ext"],
  preload: true,
  variable: "--font-inter"
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    template: `%s - ${BRAND}`,
    default: BRAND
  },
  description: config.description,
  formatDetection: { telephone: false, address: false },
  openGraph: {
    type: "website",
    siteName: BRAND,
    title: BRAND,
    description: config.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND,
    description: config.description,
  },
  other: {
    "apple-mobile-web-app-status-bar": "#9e00ff"
  }
}

export const viewport: Viewport = {
  themeColor: "#9e00ff"
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={inter.variable}
      suppressHydrationWarning
    >
      <head>
        <link rel="mask-icon" href="./safari-pinned-tab.svg" color="9e00ff" />
      </head>
      <body className="bg-background text-foreground prose-headings:font-bold font-inter !overflow-x-hidden text-sm font-medium">
        <Analytics />
        <PreconnectResources />
        <CheckLocalSettings />
        <div data-mav-root-layout-slot="" className="contents">
          <SkipNav />
          <NoJSMessage />
          <ThemeProvider>
            <Provider>
              <AuthProvider>
                <NsfwPreferencesProvider>{children}</NsfwPreferencesProvider>
              </AuthProvider>
            </Provider>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
