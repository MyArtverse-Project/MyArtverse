import type { PropsWithChildren } from "react"

interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  action?: string | ((formData: FormData) => void)
  className?: string
}

export function Form(props: PropsWithChildren<FormProps>) {
  return (
    <form
      data-mav-form-wrapper=""
      onSubmit={props.onSubmit}
      className={`flex flex-col gap-y-2.5 ${props.className}`}
      action={props.action}
    >
      {props.children}
    </form>
  )
}
