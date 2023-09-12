"use client"

import { kebabCase } from "lodash"

export default function InputField({
  inputName,
  type = "text",
  placeholder,
  required,
  onChange,
  value,
  readOnly
}: {
  inputName: string
} & Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "placeholder" | "required" | "onChange" | "value" | "readOnly"
>) {
  return (
    <span
      data-biro-ui-input-field=""
      className="flex flex-col gap-y-1.5 w-full"
    >
      <label htmlFor={inputName} className="uppercase text-600 font-bold">
        {inputName}
      </label>
      <input
        className="px-4 py-2 border rounded-md text-700 border-400 w-full bg-100"
        name={inputName}
        id={kebabCase(inputName)}
        type={type}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
      <div data-error-boundary=""></div>
    </span>
  )
}
