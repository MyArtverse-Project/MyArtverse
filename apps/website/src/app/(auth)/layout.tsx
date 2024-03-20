import { Footer } from "@/components/base"

export default function AuthLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
