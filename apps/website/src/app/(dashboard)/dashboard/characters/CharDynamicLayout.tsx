"use client"

import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"
import { usePathStartsWith } from "@/hooks"
import cn from "@/utils/cn"

export default function CharDynamicLayout({ children }: { children?: React.ReactNode }) {
  const charEditPageRoute = usePathStartsWith("/dashboard/characters/edit")

  return (
    <Container
      headingTransparent
      noChildrenPadding={!charEditPageRoute}
      heading={charEditPageRoute ? "Edit <name>" : "Your characters"}
    >
      <div className={cn("bg-100 sticky top-16 z-10", charEditPageRoute ? "hidden" : "")}>
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
      </div>
      {children}
    </Container>
  )
}
