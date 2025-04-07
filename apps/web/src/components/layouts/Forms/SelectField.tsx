import { cn } from "@mav/shared/utils"

export default function SelectField({
  inputName,
  options,
  onChange,
  value,
  className,
  noLabel
}: {
  inputName: string
  options: { value: string; label: string }[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
  className?: string
  noLabel?: boolean
}) {
  return (
    <div className={cn("flex w-full flex-col gap-y-1.5", className)}>
      {noLabel ? null : (
        <label className="text-600 gap-x-0.5 font-bold uppercase">
          {inputName}
        </label>
      )}
      <select
        className="text-700 border-400 bg-100 rounded-md border px-4 py-2"
        onChange={onChange}
      >
        <option value="none" disabled selected={!value}>
          Select {inputName}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value == value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
