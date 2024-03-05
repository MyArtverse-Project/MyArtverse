"use client"

import clsx from "clsx"
import { kebabCase } from "lodash"
import type { ReactMapElement } from "@/types/utils"

export default function InputField({
  inputName = "",
  type = "text",
  placeholder,
  required,
  error,
  onChange,
  value,
  readOnly,
  noLabel = false
}: {
  inputName?: string
  noLabel?: boolean
  error?: string
} & Pick<
  ReactMapElement<"input">,
  "type" | "placeholder" | "required" | "onChange" | "value" | "readOnly"
>) {
  const InputWrapper = () => (
    <input
      className="text-700 border-400 bg-100 w-full rounded-md border px-4 py-2"
      id={kebabCase(inputName)}
      name={kebabCase(inputName)}
      type={type}
      placeholder={placeholder}
      aria-placeholder={placeholder}
      required={required}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
    />
  )

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
        <InputWrapper />
      </label>
      <div>{error}</div>
    </div>
  )
}
