import type { ChildrenNode } from "@/types"
import "./globals.scss"

import { Inter, Open_Sans } from "next/font/google"
import { Footer, Navbar, Sidebar } from "@/components/Base"
import { NavbarProvider } from "@/contexts"

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

export default function RootLayout({ children }: ChildrenNode) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${open_sans.variable}`}
    >
      <body className="antialiased font-open-sans">
        <div id="__next">
          <NavbarProvider>
            <Navbar />
            <Sidebar />
          </NavbarProvider>
          <main id="skip-navigation">{children}</main>
          <Footer />
        </div>
        <div portal-container="" />
      </body>
    </html>
  )
}
