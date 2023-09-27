import clsx from "clsx"

export default function Field({
  title,
  content,
  custom,
  full
}: {
  title?: string
  content?: string
  custom?: boolean
  full?: boolean
}) {
  return (
    <div
      id="field"
      className={clsx(
        "inline-flex flex-col gap-y-1 px-2 py-1.5",
        !full ? "w-1/2" : "w-full"
      )}
    >
      <div>
        <span className="font-bold font-inter uppercase text-[0.8rem] opacity-50">
          {title}
        </span>
      </div>
      <div>{content}</div>
    </div>
  )
}
