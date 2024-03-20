interface ISelectFieldProps {
  inputName: string
  options: { value: string; label: string }[]
}

export default function SelectField({ inputName, options }: ISelectFieldProps) {
  return (
    <div className="flex w-full flex-col gap-y-1.5">
      <span className="text-600 gap-x-0.5 font-bold uppercase">{inputName}</span>
      <select className="text-700 border-400 bg-100 rounded-md border px-4 py-2">
        <option value="none" disabled>
          {inputName}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
