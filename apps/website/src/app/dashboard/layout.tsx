export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <nav
        style={{ width: 250 }}
        className="border-r-separator sticky top-16 h-[calc(100dvh-4rem)] border-r [align-self:flex-start]"
      >
        sidebar items
      </nav>
      <div className="w-full">{children}</div>
    </div>
  )
}
