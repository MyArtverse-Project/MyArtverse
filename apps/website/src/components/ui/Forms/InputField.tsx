"use client"

import clsx from "clsx"
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
    <div className="w-full">
      <label htmlFor={kebabCase(inputName)} className="flex flex-col gap-y-1.5">
        <span
          className={clsx(
            "flex gap-x-0.5 uppercase text-600 font-bold",
            required
              ? "after:content-['*'] after:ml-1 after:font-bold after:text-error"
              : null
          )}
        >
          {inputName}
        </span>
        <input
          className="px-4 py-2 border rounded-md text-700 border-400 w-full bg-100"
          id={kebabCase(inputName)}
          name={kebabCase(inputName)}
          type={type}
          placeholder={placeholder}
          aria-placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
        />
      </label>
      <div data-error-boundary=""></div>
    </div>
  )
}
