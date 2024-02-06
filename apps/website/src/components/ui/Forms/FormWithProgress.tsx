import Link from "next/link"
import clsx from "clsx"

export default function FormWithProgress({
  children,
  progress
}: {
  children: React.ReactNode
  progress?: Array<{
    item?: string
    isComplete?: boolean
  }>
}) {
  if (!progress) {
    throw new Error("Parameter `progress` is required.")
  }

  const FormProgress = () => {
    return (
      <div>
        {progress.map(({ item, isComplete }, i) => (
          <div key={i} className="px-5 flex gap-x-4 items-center pt-3 pb-1.5">
            <div
              className={clsx(
                "flex-shrink-0 w-4 h-4 rounded-full",
                i !== 0
                  ? "before:block before:w-[0.133rem] before:relative before:left-[0.4rem] before:h-14 before:bottom-10 before:-z-[1]"
                  : "",
                !isComplete ? "bg-mute before:bg-mute" : "bg-500 before:bg-500"
              )}
              aria-hidden
            />
            <span className={clsx("font-inter text-lg", !isComplete ? "text-mute" : "text-500")}>
              {item}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex mx-auto max-w-screen-xl px-9 gap-x-4 mt-12">
      <div className="w-1/4 flex-shrink-0">
        <aside className="sticky top-24 flex flex-col gap-y-5">
          <FormProgress />
          <div className="px-4">
            <div>
              {"Already have an account? "}
              <Link href="/login" className="text-info underline">
                Sign in
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <div>{children}</div>
    </div>
  )
}
