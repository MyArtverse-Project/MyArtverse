export default function SkipNav() {
  return (
    <a
      className="bg-500 text-active pointer-events-none fixed left-3 top-3 z-30 rounded-lg px-6 py-2.5 opacity-0 focus:pointer-events-auto focus:opacity-100"
      href="#skip-to-content"
    >
      Skip to content?
    </a>
  )
}
