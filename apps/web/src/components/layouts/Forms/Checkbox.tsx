import { kebabCase } from "lodash"
import clsx from 'clsx'

export default function Checkbox({
  inputName,
  label,
  checked,
  onChange,
  disabled
}: {
  inputName: string
  label: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}) {
  return (
    // TODO: add accessibility hints
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        id={kebabCase(inputName)}
        name={inputName}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="border-300 h-5 w-5 appearance-none rounded-sm border checked:border-transparent checked:bg-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={kebabCase(inputName)} className={clsx("text-700")}>
        {label}
      </label>
    </div>
  )
}
