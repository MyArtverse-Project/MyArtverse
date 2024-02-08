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
            "text-600 flex gap-x-0.5 font-bold uppercase",
            required
              ? "after:text-error after:ml-1 after:font-bold after:content-['*']"
              : null
          )}
        >
          {inputName}
        </span>
        <input
          className="text-700 border-400 bg-100 w-full rounded-md border px-4 py-2"
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
      {/* Error boundary */}
      <div></div>
    </div>
  )
}
