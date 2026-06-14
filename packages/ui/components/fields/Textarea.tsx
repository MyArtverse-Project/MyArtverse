"use client"
import type { ReactForwardRef, ReactHTMLElement } from "@mav/shared/types"
import { cn } from "@mav/shared/utils"
import FieldLabel from "./FieldLabel"
import { DIV_TAG, LABEL_TAG } from "./fields.constants"
import type { MAVFields } from "./fields.types"
import { useMemoizeA11yLabel } from "./fields.utils"

type PickedTextareaProps = Pick<
  ReactHTMLElement<"textarea">,
  | "placeholder"
  | "required"
  | "onChange"
  | "value"
  | "readOnly"
  | "onKeyDown"
  | "onClick"
  | "onChange"
  | "onBlur"
  | "className"
  | "spellCheck"
>

interface TextAreaProps extends PickedTextareaProps, MAVFields {
  initialHeight: number
  heightLimit: number
  isResizable: boolean
}

export function Textarea({
  ref,
  ...props
}: ReactForwardRef<HTMLTextAreaElement, Partial<TextAreaProps>>) {
  const {
    error,
    initialHeight,
    heightLimit,
    inputName,
    noLabel,
    isResizable,
    charLimit,
    placeholder,
    readOnly,
    className,
    spellCheck,
    onChange,
    ...eventHandlers
  } = props

  const uniqueId = useMemoizeA11yLabel(inputName)
  const DynamicElement = !noLabel ? LABEL_TAG : DIV_TAG

  return (
    <div data-mav-textarea="" className="w-full">
      <span className="sr-only" id={uniqueId}>
        {inputName}
      </span>
      <DynamicElement
        className="flex flex-col gap-y-1.5"
        htmlFor={!props.noLabel ? uniqueId : undefined}
        aria-labelledby={inputName ? uniqueId : undefined}
      >
        {!props.noLabel && (
          <FieldLabel label={inputName} isRequired={props.required} />
        )}
        <textarea
          ref={ref}
          aria-labelledby={inputName ? uniqueId : undefined}
          className={cn(
            "text-700 border-500 bg-100 w-full rounded-md px-3.5 py-2 text-sm",
            className
          )}
          id={uniqueId}
          name={uniqueId}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={spellCheck}
          title=""
          onChange={onChange}
          {...eventHandlers}
        />
      </DynamicElement>
    </div>
  )
}
