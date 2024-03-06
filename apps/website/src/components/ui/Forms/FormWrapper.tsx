import type { ReactMapElement } from "@/types/utils"

export default function FormWrapper({
  children,
  ...attributes
}: { children?: React.ReactNode } & ReactMapElement<"form">) {
  return <form {...attributes}>{children}</form>
}
