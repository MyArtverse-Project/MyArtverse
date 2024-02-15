import { Button } from "@/components/ui/Buttons"
import { Container } from "@/components/ui/Dashboard"
import { LuPlus } from "react-icons/lu"
import DashboardTitle from "../../DashboardTitle"

export const metadata = DashboardTitle("Characters")

export default function CharacterPage() {
  return (
    <Container
      noChildrenPadding
      heading="Your characters"
      actions={
        <>
          <Button prefixIcon={<LuPlus size={20} />}>Create character</Button>
        </>
      }
    >
      Content
    </Container>
  )
}
