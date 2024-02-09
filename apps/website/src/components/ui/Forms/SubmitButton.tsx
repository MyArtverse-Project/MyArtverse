import { Button } from "../Buttons"

export default function SubmitButton({
  children,
  variant,
  ...attributes
}: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button type="submit" variant={variant} {...attributes}>
      {children}
    </Button>
  )
}
