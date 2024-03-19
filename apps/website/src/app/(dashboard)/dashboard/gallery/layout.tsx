import { Container } from "@/components/dashboard"

export default function GalleryLayout({ children }: { children?: React.ReactNode }) {
  return (
    <Container headingTransparent noChildrenPadding heading="Gallery">
      {children}
    </Container>
  )
}
