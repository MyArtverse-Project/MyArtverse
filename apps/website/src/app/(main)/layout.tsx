import { Footer, Navbar, Sidebar } from "@/components/base"

export default function MainLayout({
  children
}: Readonly<{ children?: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-20">
        <Navbar />
        <Sidebar />
      </header>
      <div id="skip-nav" className="min-h-[calc(100dvh-3.75rem)]">
        {children}
      </div>
      <Footer />
    </>
  )
}
