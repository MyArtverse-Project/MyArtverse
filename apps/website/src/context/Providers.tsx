import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { SidebarProvider } from "./NavbarProvider"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({
  children,
  session
}: {
  children?: React.ReactNode
  session?: Session
}) {
  return (
      <ThemeProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
  )
}
