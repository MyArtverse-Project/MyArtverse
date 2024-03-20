import type { Metadata } from "next"
import { Container } from "@/components/dashboard"
import { Button } from "@/components/ui/Buttons"

export const metadata: Metadata = {
  title: "Overview"
}

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
