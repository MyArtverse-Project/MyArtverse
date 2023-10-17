export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <nav
        data-d-nav-drawer=""
        style={{ width: 250 }}
        className="sticky top-16 [align-self:flex-start] h-[calc(100dvh-4rem)] border-r border-r-separator"
      >
        sidebar items
      </nav>
      <div className="w-full">{children}</div>
    </div>
  )
}
