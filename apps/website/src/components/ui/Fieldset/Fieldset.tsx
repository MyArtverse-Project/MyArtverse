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
    <section
      id="biro-ui-fieldset"
      className="p-6 rounded-lg border border-300 bg-200"
    >
      <div>
        {heading ? <h5 className="mb-4">{heading}</h5> : null}
        {description ? <span>{description}</span> : null}
      </div>
      <div className="pt-2">{children}</div>
    </section>
  )
}