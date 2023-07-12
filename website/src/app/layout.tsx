"use client"

import { useEffect } from "react"
import type { ChildrenNode } from "@/types"
import "./globals.scss"
import { Inter, Open_Sans } from "next/font/google"

import { NavbarProvider } from "@/contexts"
import { Footer, Navbar, Sidebar } from "@/components/Base"

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
    console.log(
      "%c✨ Are you looking to improve MyFursona?",
      "color: orchid; font-size: 1.5rem"
    )
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
        <div portal-container="" />
      </body>
    </html>
  )
}
