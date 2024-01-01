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
        <h2 className="px-4 py-1 font-semibold text-subtext uppercase text-md not-prose">
          {heading}
        </h2>
      )}
      {children}
    </div>
  )
}
