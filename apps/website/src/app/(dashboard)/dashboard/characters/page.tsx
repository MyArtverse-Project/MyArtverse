import { Container } from "@/components/ui/Dashboard"
import DashboardTitle from "../../DashboardTitle"

export const metadata = DashboardTitle("Characters")

export default function CharacterPage() {
  return (
    <Container noChildrenPadding heading="Your characters">
      Content
    </Container>
  )
}
