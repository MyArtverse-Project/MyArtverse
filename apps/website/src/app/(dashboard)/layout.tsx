import { redirect } from "next/navigation"
import { DashboardNavbar, DashboardSidebar } from "@/components/ui/Dashboard"
import { fetchUserData } from "@/utils/api"

export default async function DashboardLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  const userData = await fetchUserData().catch(() => {
    return redirect("/login")
  })

  return (
    <div>
      <header className="sticky top-0 z-20">
        <DashboardNavbar userData={userData} />
      </header>
      <div className="flex">
        <DashboardSidebar userData={userData} />
        <main className="w-full">{children}</main>
      </div>
    </div>
  )
}
