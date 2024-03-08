import dynamic from "next/dynamic"
import { redirect } from "next/navigation"
import { fetchUserData } from "@/utils/api"
import { DashboardNavbar } from "@/components/dashboard"
import { Note } from "@/components/ui"

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
        <DashboardSidebar userData={userData} />
        <main className="w-full">
          <noscript>
            <div className="p-4">
              <Note type="warning">
                You'll need to enable JavaScript to access the dashboard.
              </Note>
            </div>
          </noscript>
          {children}
        </main>
      </div>
    </div>
  )
}
