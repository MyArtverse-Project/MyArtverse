export default function FormWrapper({
  children,
  ...attributes
}: { children?: React.ReactNode } & React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...attributes}>{children}</form>
}
