export default function MarginClamp({
  children,
  as: Element = "div"
}: {
  children?: React.ReactNode
  as?: keyof HTMLElementTagNameMap
}) {
  return <Element className="px-12 mx-auto max-w-screen-2xl">{children}</Element>
}
