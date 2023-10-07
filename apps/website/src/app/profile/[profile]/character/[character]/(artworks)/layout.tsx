import type { SlugRouteProps } from "@/types"
import { MarginClamp } from "@/components/ui"

export default function Layout({
  params,
  children
}: SlugRouteProps & { children: React.ReactNode }) {
  const profile = params.profile

  return (
    <>
      <MarginClamp as="main">
        <div className="py-4">{children}</div>
      </MarginClamp>
    </>
  )
}
