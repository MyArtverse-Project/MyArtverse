"use client"

import { useState } from "react"
import { Container } from "@/components/dashboard"
import { Tabs } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { usePathStartsWith } from "@/hooks"
import cn from "@/utils/cn"
import CreateCharacterView from "./CreateCharacterModal"

export default function CharDynamicLayout({ children }: { children?: React.ReactNode }) {
  const charEditPageRoute = usePathStartsWith("/dashboard/characters/edit")
  const [createCharacterModal, setCreateCharacterModal] = useState(false)

  const toggleCreateCharacterModal = () => {
    setCreateCharacterModal(!createCharacterModal)
    return
  }

  return (
    <Container
      headingTransparent
      noChildrenPadding={!charEditPageRoute}
      heading={charEditPageRoute ? "Edit <name>" : "Your characters"}
      actions={<Button onClick={toggleCreateCharacterModal}>Create Character</Button>}
    >
      <div className={cn("bg-100 sticky top-16 z-10", charEditPageRoute ? "hidden" : "")}>
        <div className="after:border-b-mute relative flex items-center justify-start px-3 after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] after:border-b">
          <Tabs
            baseURL="/dashboard"
            items={[
              { link: "/characters", text: "Characters" },
              { link: "/characters/refsheets", text: "Ref sheets" }
            ]}
          />
        </div>
      </div>
      <CreateCharacterView
        toggleCreateCharacterModal={toggleCreateCharacterModal}
        createCharacterModal={createCharacterModal}
      />
      {children}
    </Container>
  )
}
