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
      className,
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
      | "className"
    >,
    ref: React.ForwardedRef<MapElement<"input">>
  ) => {
    const kebabedInputName = kebabCase(inputName)

    const LABEL_TAG = "label" as const
    const DIV_TAG = "div" as const
    const DynamicElement = !noLabel ? LABEL_TAG : DIV_TAG

    return (
      <div className="w-full">
        <DynamicElement
          htmlFor={!noLabel ? kebabCase(inputName) : null}
          className="flex flex-col gap-y-1.5"
        >
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
              error ? "border-error" : null,
              className
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
        </DynamicElement>
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
