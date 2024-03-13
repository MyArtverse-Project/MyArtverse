import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

export default function ListingLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container
      headingTransparent
      noChildrenPadding
      heading="Artist requests"
      actions={
        <>
          <Button>Manage blacklists</Button>
        </>
      }
    >
      <div className="flex items-center justify-between px-3">
        <Tabs
          baseURL="/dashboard/listings"
          items={[
            { link: "/overview", text: "Overview" },
            { link: "/listings", text: "Listings" }
          ]}
        />
      </div>
      {children}
    </Container>
  )
}
