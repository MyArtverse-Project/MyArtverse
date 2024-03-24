import Link from "next/link"
import cn from "@/utils/cn"

/**
 * @deprecated Don't use; will be removed soon
 */
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
          <div key={i} className="flex items-center gap-x-4 px-5 pb-1.5 pt-3">
            <div
              className={cn(
                "h-4 w-4 flex-shrink-0 rounded-full",
                i !== 0
                  ? "before:relative before:bottom-10 before:left-[0.4rem] before:-z-[1] before:block before:h-14 before:w-[0.133rem]"
                  : "",
                !isComplete ? "bg-mute before:bg-mute" : "bg-500 before:bg-500"
              )}
              aria-hidden
            />
            <span
              className={cn("font-inter text-lg", !isComplete ? "text-mute" : "text-500")}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mx-auto mt-12 flex max-w-screen-xl gap-x-4 px-9">
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
      <div className="w-full">{children}</div>
    </div>
  )
}
