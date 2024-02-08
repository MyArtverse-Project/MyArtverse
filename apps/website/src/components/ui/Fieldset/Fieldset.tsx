export default function Fieldset({
  children,
  heading,
  description
}: {
  children?: React.ReactNode
  heading?: string
  description?: NonNullable<React.ReactElement> | string
}) {
  return (
    <section className="border-300 bg-200 rounded-lg border p-3.5 px-4">
      {heading ? <h2 className="pb-0.5 text-xl">{heading}</h2> : null}
      {description ? <span>{description}</span> : null}
      <div className="pt-2">{children}</div>
    </section>
  )
}
