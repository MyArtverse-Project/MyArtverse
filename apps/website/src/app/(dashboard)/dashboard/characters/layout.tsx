import { Tabs } from "@/components/ui"
import { Container } from "@/components/dashboard"

export default function CharactersLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container headingTransparent noChildrenPadding heading="Your characters">
      <div className="flex items-center justify-start px-3">
        <Tabs
          baseURL="/dashboard"
          items={[
            { link: "/characters", text: "Characters" },
            { link: "/characters/refsheets", text: "Ref sheets" }
          ]}
        />
      </div>
      <div>{children}</div>
    </Container>
  )
}
