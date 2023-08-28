export default function MenuGroup({
  children,
  heading
}: {
  children?: React.ReactNode
  heading?: string
}) {
  return (
    <div role="group">
      {heading && (
        <h2 className="px-4 py-1 font-semibold text-black uppercase text-[0.915rem]">
          {heading}
        </h2>
      )}
      {children}
    </div>
  )
}
