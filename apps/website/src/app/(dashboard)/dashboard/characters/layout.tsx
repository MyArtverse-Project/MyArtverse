import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"

export default function CharactersLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container headingTransparent noChildrenPadding heading="Your characters">
      <div className="after:border-b-mute relative flex items-center justify-start px-3 after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:border-b">
        <Tabs
          baseURL="/dashboard"
          items={[
            { link: "/characters", text: "Characters" },
            { link: "/characters/refsheets", text: "Ref sheets" },
            { link: "/characters/create", text: "Create Character" }
          ]}
        />
      </div>
      <div>{children}</div>
    </Container>
  )
}
