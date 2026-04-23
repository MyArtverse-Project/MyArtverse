import { Button } from "@mav/ui/components/buttons"
import { LuLogIn } from "react-icons/lu"

export function ActionsLoggedOut() {
  return (
    <>
      <Button
        variant="secondary"
        href={"/login"}
        prefix={<LuLogIn size={19} />}
      >
        <span className="w-max">Log in</span>
      </Button>
    </>
  )
}
