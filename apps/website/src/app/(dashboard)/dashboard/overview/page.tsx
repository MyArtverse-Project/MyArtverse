import { Container } from "@/components/dashboard"
import { Button } from "@/components/ui/Buttons"
import DashboardTitle from "@/utils/DashboardTitle"

export const metadata = DashboardTitle("Overview")

export default function DashboardPage() {
  return (
    <div className="bg-200">
      <Container
        heading="Overview"
        actions={
          <>
            <Button variant="secondary">Manage blacklists</Button>
          </>
        }
      >
        space
      </Container>
    </div>
  )
}
