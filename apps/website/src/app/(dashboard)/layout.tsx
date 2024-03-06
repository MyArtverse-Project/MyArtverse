import dynamic from "next/dynamic"
import { DashboardNavbar } from "@/components/dashboard"
import { Note } from "@/components/ui"

const DashboardSidebar = dynamic(() =>
  import("@/components/dashboard").then((c) => c.DashboardSidebar)
)

export default function DashboardLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <div>
      <header className="sticky top-0 z-20">
        <DashboardNavbar />
      </header>
      <div className="flex">
        <DashboardSidebar />
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
