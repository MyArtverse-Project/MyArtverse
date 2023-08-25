import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { NavbarProvider } from "./NavbarProvider"
import { ThemeProvider } from "./ThemeProvider"

export default function Providers({
  children,
  session
}: {
  children?: React.ReactNode
  session?: Session
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <NavbarProvider>{children}</NavbarProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
