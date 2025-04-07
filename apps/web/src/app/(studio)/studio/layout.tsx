import { StudioLayout } from "@/components/layouts/StudioLayout/StudioLayout"

export default function StudioRootLayout({
  children
}: React.PropsWithChildren) {
  return <StudioLayout>{children}</StudioLayout>
}
