"use client"

import dynamic from "next/dynamic"
import Footer from "./Footer"
import Navbar from "./Navbar"

const Sidebar = dynamic(() => import("./Sidebar"), { ssr: false })

export default function GlobalLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="sticky top-0 z-20">
        <Navbar />
        <Sidebar />
      </header>
      {children}
      <Footer />
    </>
  )
}
