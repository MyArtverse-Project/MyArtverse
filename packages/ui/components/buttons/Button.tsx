"use client"

import type { ReactForwardRef, ReactHTMLElement } from "@mav/shared/types"
import { cn } from "@mav/shared/utils"
import { cva } from "class-variance-authority"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import React from "react"
import type { ButtonProps as SharedButtonProps } from "./Button.types"

type ButtonProps = React.PropsWithChildren<
  SharedButtonProps &
    Pick<ReactHTMLElement<"button">, "className" | "onClick"> &
    Pick<ReactHTMLElement<"a">, "aria-current">
>

export function Button({
  ref,
  ...props
}: ReactForwardRef<HTMLButtonElement, Partial<ButtonProps>>) {
  const {
    disabled,
    icon,
    position,
    variant,
    size,
    href,
    type,
    className,
    prefix,
    suffix,
    children,
    ...eventHandlers
  } = props

  const buttonVars = cva(
    [
      "flex items-center gap-x-1.5 rounded-md transition-all select-none first:*:flex-shrink-0 last:*:flex-shrink-0",
      disabled && "cursor-not-allowed",
      className
    ],
    {
      variants: {
        intent: {
          primary: !disabled
            ? "border-transparent bg-300 hover:bg-400"
            : "bg-mute",
          secondary: !disabled
            ? "!border-[2px] bg-100 border-300 hover:bg-400 hover:border-400"
            : "!border-[2px] border-mute",
          tritery: !disabled
            ? "border-transparent bg-transparent hover:bg-300"
            : "opacity-60",
          warning: "bg-warning text-active-invert hover:bg-opacity-75",
          "warning-secondary":
            "border border-warning hover:bg-warning hover:text-100",
          alert:
            "bg-alert text-active hover:bg-opacity-70 bg-opacity-100 border-transparent",
          "alert-secondary": "border border-alert hover:bg-alert"
        },
        size: {
          small: !icon ? "px-2.5 py-1" : "p-2",
          medium: !icon ? "px-3.5 py-2" : "p-2",
          big: !icon ? "px-5 py-2" : "p-3"
        },
        positions: {
          left: "text-left justify-start",
          center: "text-center justify-center",
          right: "text-right justify-end"
        }
      },
      compoundVariants: [{ intent: "primary", size: "medium" }],
      defaultVariants: {
        intent: "primary",
        size: "medium"
      }
    }
  )

  const DynamicElement: any = !props.href ? "button" : Link

  return (
    <DynamicElement
      data-mav-button=""
      ref={ref}
      href={href ?? null}
      type={!href ? (type ?? null) : null}
      // The use of "aria-disabled" here to let the screen reader know it's a disabled button,
      // so it's not completely hidden
      aria-disabled={disabled ?? null}
      className={cn(
        buttonVars({
          positions: position,
          intent: variant,
          size: size
        })
      )}
      {...eventHandlers}
      // This is to prevent conflicts from custom "prefix" and "suffix" props
      prefix={null}
      suffix={null}
    >
      {prefix}
      <div className="contents">
        {icon}
        {children}
      </div>
      {suffix}
    </DynamicElement>
  )
}
