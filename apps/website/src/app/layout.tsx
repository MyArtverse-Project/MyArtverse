import "@myfursona/biro-ui/styles/globals.scss"
// import "react-quill/dist/quill.snow.css"
import type { Metadata, Viewport } from "next"
import { Inter, Open_Sans } from "next/font/google"
import Script from "next/script"
import { ClientInit } from "@/components/base"
import NoJSReminder from "@/components/base/NoJSReminder"
import Providers from "@/context"
import { BRAND } from "@myfursona-internal/config"
import clsx from "clsx"
import dedent from "dedent"

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
    siteName: BRAND
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
  const umamiId = process.env.UMAMI_ID || ""
  const clarityId = process.env.MS_CLARITY_ID || ""

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
      </head>
      <body className="bg-100 text-700 bg-background prose-headings:font-bold prose-headings:font-inter font-open-sans select-none !overflow-x-hidden text-sm font-medium">
        <Providers>
          <NoJSReminder />
          <div>
            <ClientInit />
            {children}
          </div>
        </Providers>
        {/* Site analytics - Umami */}
        <Script
          id="umami"
          async
          src="https://eu.umami.is/script.js"
          data-website-id={umamiId}
        />
        {/* Behavior analytics - Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {dedent`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      </body>
    </html>
  )
}
