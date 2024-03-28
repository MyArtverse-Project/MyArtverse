import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { SidebarSkeleton } from "@/components/dashboard"
import { fetchSelfCharacters } from "@/utils/api"

// import { redirect } from "next/navigation"
// import { fetchUserData } from "@/utils/api"

export const metadata: Metadata = {
  title: {
    default: "Unset title",
    template: "%s | MyArtverse Dashboard"
  }
}

const Navbar = dynamic(() => import("@/components/dashboard").then((c) => c.Navbar))

const Sidebar = dynamic(() => import("@/components/dashboard").then((c) => c.Sidebar), {
  ssr: false,
  loading: SidebarSkeleton
})

export default async function DashboardLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  // const userData = await fetchUserData().catch(() => {
  //   return redirect("/login")
  // })
  const characters = await fetchSelfCharacters()

  return (
    <>
      <header className="sticky top-0 z-20">
        <Navbar />
      </header>
      <div className="flex">
        <Sidebar characters={characters} />
        <main className="w-full">{children}</main>
      </div>
    </>
  )
}
