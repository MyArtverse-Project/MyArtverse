import { DashboardNavbar, DashboardSidebar } from "@/components/ui/Dashboard"

export default function DashboardLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-20">
        <DashboardNavbar />
      </header>
      <div className="flex">
        <DashboardSidebar />
        <div className="w-full">{children}</div>
      </div>
    </>
  )
}
