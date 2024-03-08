import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
// import { DashboardNavbar, DashboardSidebar } from "@/components/dashboard"
import { fetchUserData } from "@/utils/api"

const Navbar = dynamic(() =>
  import("@/components/dashboard").then((c) => c.DashboardNavbar)
)

const Sidebar = dynamic(() =>
  import("@/components/dashboard").then((c) => c.DashboardSidebar)
)

export default async function DashboardLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  const userData = await fetchUserData().catch(() => {
    return redirect("/login")
  })

  return (
    <div>
      <header className="sticky top-0 z-20">
        <Navbar userData={userData} />
      </header>
      <div className="flex">
        <Sidebar userData={userData} />
        <main className="w-full">{children}</main>
      </div>
    </div>
  )
}
