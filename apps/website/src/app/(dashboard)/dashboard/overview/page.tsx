import { Button } from "@/components/ui/Buttons"
import { Container } from "@/components/dashboard"
import DashboardTitle from "@/utils/DashboardTitle"

export const metadata = DashboardTitle("Overview")

export default function DashboardPage() {
  // TODO: check if the user is logged in, if not, redir to login page -- this is achieved by modifying middleware.ts

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
