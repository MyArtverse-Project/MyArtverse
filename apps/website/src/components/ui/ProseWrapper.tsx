export default function ProseWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id="prose-wrapper"
      className="prose-headings:font-inter prose-headings:my-2  prose-h1:text-5xl prose-h2:text-[2.75rem] prose-h3:text-4xl prose-h4:text-[2rem] prose-h5:text-[1.65rem]"
    >
      {children}
    </div>
  )
}
