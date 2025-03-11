import { cn } from "@mav/shared/utils"

export interface FormState {
  errors: Record<string, string[]>
  message: string
}

interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  className?: string
  action?: (formData: FormData) => void | string
}

export function Form(props: React.PropsWithChildren<FormProps>) {
  return (
    <form
      data-mav-form-wrapper=""
      onSubmit={props.onSubmit}
      className={cn("flex flex-col gap-y-2.5", props.className)}
      // @ts-expect-error: Temporary fix for the action prop
      action={props.action}
    >
      {props.children}
    </form>
  )
}
