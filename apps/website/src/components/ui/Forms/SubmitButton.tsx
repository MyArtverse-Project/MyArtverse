import type { BuiButtonProps } from "@/types"
import { Button } from "../Buttons"

export default function SubmitButton({ children, variant, ...attributes }: BuiButtonProps) {
  return (
    <Button type="submit" variant={variant} {...attributes}>
      {children}
    </Button>
  )
}
