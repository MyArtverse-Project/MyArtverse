export function MenuGroup({
  children,
  heading
}: {
  children?: React.ReactNode
  heading?: string
}) {
  return (
    <div role="group">
      {heading && (
        <h2 className="text-subtext text-md not-prose px-4 py-1 font-semibold uppercase">
          {heading}
        </h2>
      )}
      {children}
    </div>
  )
}
