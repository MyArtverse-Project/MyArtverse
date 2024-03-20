import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
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
          <Button icon={<LuMoreVertical size={19} />} />
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
          <Button icon={<LuArrowDownAZ size={19} />} variant="tritery" />
          <Button icon={<LuSearch size={19} />} variant="tritery" />
        </div>
      </div>
      {children}
    </Container>
  )
}
