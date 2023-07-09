import type { ChildrenNode } from "@/types"
import "./globals.scss"
import setPageMeta from "@/utils/setPageMeta"

import { Inter } from "next/font/google"
import { Footer, Navbar } from "@/components/Base"
import { Sidebar } from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = setPageMeta({
  title: "Home - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function RootLayout({ children }: ChildrenNode) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <div id="__next">
          <Navbar />
          <Sidebar />
          <main id="skip-navigation">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
