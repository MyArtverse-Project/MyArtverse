import { Button } from "../Buttons"
import type { BuiButtonProps } from "@/types"

export default function SubmitButton({
  children,
  variant,
  ...attributes
}: BuiButtonProps) {
  return (
    <Button type="submit" variant={variant} {...attributes}>
      {children}
    </Button>
  )
}
