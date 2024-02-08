export default function MarginClamp({
  children,
  as: Element = "div"
}: {
  children?: React.ReactNode
  as?: keyof HTMLElementTagNameMap
}) {
  return <Element className="mx-auto max-w-screen-2xl px-12">{children}</Element>
}
