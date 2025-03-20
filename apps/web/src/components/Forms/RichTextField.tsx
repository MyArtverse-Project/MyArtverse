import { cn } from "@mav/shared/utils"

export default function RichTextField({
  inputName,
  onChange,
  value,
  code
}: {
  inputName: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  code?: boolean
}) {
  return (
    <div className="h-32 w-full space-y-2">
      <span className="text-600 flex gap-x-0.5 font-bold uppercase">{inputName}</span>
      <textarea
        onChange={onChange}
        id={inputName.toLowerCase()}
        value={value}
        className={cn(
          "text-700 border-400 bg-100 h-32 w-full rounded-md border px-4 py-2",
          code ? "whitespace-pre font-mono text-sm" : "text-base"
        )}
      />
    </div>
  )
}
