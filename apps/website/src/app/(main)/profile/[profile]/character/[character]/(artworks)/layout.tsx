import { MarginClamp } from "@/components/ui"
import type { SlugRouteProps } from "@/types/utils"

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
