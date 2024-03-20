"use client"

import { forwardRef } from "react"
import cn from "@/utils/cn"
import generateRandomString from "@/utils/generateRandomString"
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

    const rndString = generateRandomString()

    const ariaLabelledBy = `${kebabedInputName}-${rndString}`

    return (
      <div data-bui-input-field="" className="w-full">
        <span className="sr-only" id={ariaLabelledBy}>
          {inputName}
        </span>
        <DynamicElement
          htmlFor={!noLabel ? kebabCase(inputName) : null}
          className="flex flex-col gap-y-1.5"
          aria-labelledby={ariaLabelledBy}
        >
          {!noLabel ? (
            <span
              aria-labelledby={ariaLabelledBy}
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
            aria-labelledby={ariaLabelledBy}
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
        <div
          id="field-error-boundary"
          className={cn("text-error mt-2", !error ? "hidden" : "")}
        >
          <Note inline type="error">
            {error}
          </Note>
        </div>
      </div>
    )
  }
)

InputField.displayName = "InputField"

export default InputField
