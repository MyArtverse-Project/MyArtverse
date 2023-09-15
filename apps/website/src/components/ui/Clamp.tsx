export default function Gutter({
  children,
  as: Element = "div"
}: {
  children?: React.ReactNode
  as?: keyof HTMLElementTagNameMap
}) {
  return (
    <Element id="clamp" className="px-12 mx-auto max-w-screen-2xl">
      {children}
    </Element>
  )
}
