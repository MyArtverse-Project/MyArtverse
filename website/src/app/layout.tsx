"use client"

import "./globals.scss"
import { useEffect } from "react"
import { Inter, Open_Sans } from "next/font/google"
import dynamic from "next/dynamic"

import type { ChildrenNode } from "@/types"
import { NavbarProvider } from "@/contexts"
import { Navbar } from "@/components/Base"

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

export default function RootLayout({ children }: ChildrenNode) {
  useEffect(() => {
    console.log("%c✨ Are you looking to improve MyFursona?", "color: orchid")
    console.log(
      "🦊 The code, including this website, is open-source! https://github.com/MyFursona-Project"
    )
  }, [])

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
      </body>
    </html>
  )
}
