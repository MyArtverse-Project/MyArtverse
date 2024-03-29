import { Footer, Navbar, Sidebar } from "@/components/base"
import { fetchUserData } from "@/utils/api"

export default async function MainLayout({
  children,
  modal
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const userData = await fetchUserData()
  return (
    <>
      <div>
        <header className="sticky top-0 z-20">
          <Navbar user={userData} />
          <Sidebar />
        </header>
        <div id="skip-nav" className="min-h-[calc(100dvh-3.75rem)]">
          {children}
        </div>
        <Footer />
      </div>
      {modal}
    </>
  )
}
