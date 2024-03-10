"use client"

import { forwardRef } from "react"
import cn from "@/utils/cn"
import { kebabCase } from "lodash"
import type { MapElement, ReactMapElement } from "@/types/utils"
import Note from "../Note"

const InputField = forwardRef(
  (
    {
      inputName = "",
      type = "text",
      placeholder,
      required,
      error,
      noLabel,
      ...attrs
    }: {
      inputName?: string
      noLabel?: boolean
      error?: string
    } & Pick<
      ReactMapElement<"input">,
      | "type"
      | "placeholder"
      | "required"
      | "onChange"
      | "value"
      | "readOnly"
      | "onKeyDown"
    >,
    ref: React.ForwardedRef<MapElement<"input">>
  ) => {
    const kebabedInputName = kebabCase(inputName)

    return (
      <div className="w-full">
        <label htmlFor={kebabCase(inputName)} className="flex flex-col gap-y-1.5">
          {!noLabel ? (
            <span
              className={cn(
                "text-600 flex gap-x-0.5 font-bold uppercase",
                required
                  ? "after:text-error after:ml-1 after:font-bold after:content-['*']"
                  : null
              )}
            >
              {inputName}
            </span>
          ) : null}
          <input
            ref={ref}
            className={cn(
              "text-700 border-400 bg-100 w-full rounded-md border px-4 py-2",
              error ? "border-error" : null
            )}
            id={kebabedInputName}
            name={kebabedInputName}
            type={type}
            placeholder={placeholder}
            required={required}
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
            {...attrs}
          />
        </label>
        {error ? (
          <div className="text-error mt-2">
            <Note inline type="error">
              {error}
            </Note>
          </div>
        ) : null}
      </div>
    )
  }
)

InputField.displayName = "InputField"

export default InputField
