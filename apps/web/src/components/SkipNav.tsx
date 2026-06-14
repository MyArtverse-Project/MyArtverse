export function SkipNav() {
  return (
    <a
      className="bg-primary text-primary-foreground pointer-events-none fixed left-3 top-3 z-[51] rounded-lg px-6 py-2.5 opacity-0 focus:pointer-events-auto focus:opacity-100"
      href="#skip-to-content"
    >
      Skip to content?
    </a>
  )
}
