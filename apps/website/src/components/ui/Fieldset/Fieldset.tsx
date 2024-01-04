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
    <section className="p-3.5 px-4 rounded-lg border border-300 bg-200">
      {heading ? <h2 className="text-xl pb-0.5">{heading}</h2> : null}
      {description ? <span>{description}</span> : null}
      <div className="pt-2">{children}</div>
    </section>
  )
}
