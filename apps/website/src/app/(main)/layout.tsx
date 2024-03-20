import { Footer, Navbar, Sidebar } from "@/components/base"
import { fetchUserData } from "@/utils/api"
import type { UserType } from "@/types/users"

export default async function MainLayout({
  children,
  modal
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  let userData: UserType | null = null

  try {
    userData = await fetchUserData()
  } catch (error) {
    console.error("Failed to fetch user data:", error)
  }

  return (
    <>
      <div>
        <header className="sticky top-0 z-20">
          <Navbar userData={userData} />
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
