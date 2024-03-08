import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { Container } from "@/components/dashboard"
import { LuArrowDownAZ, LuMoreVertical, LuSearch } from "react-icons/lu"

export default function ListingLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container
      headingTransparent
      noChildrenPadding
      heading="Listings"
      actions={
        <>
          <Button>Manage blacklists</Button>
          <Button iconOnly>
            <LuMoreVertical size={19} />
          </Button>
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
        <div className="flex gap-x-1">
          <Button iconOnly variant="tritery">
            <LuArrowDownAZ size={19} />
          </Button>
          <Button iconOnly variant="tritery">
            <LuSearch size={19} />
          </Button>
        </div>
      </div>
      {children}
    </Container>
  )
}
