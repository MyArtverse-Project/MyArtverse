import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LuLogIn } from "react-icons/lu"

export function ActionsLoggedOut() {
  return (
    <Button variant="secondary" asChild>
      <Link href="/login">
        <LuLogIn size={19} />
        <span className="w-max">Log in</span>
      </Link>
    </Button>
  )
}
