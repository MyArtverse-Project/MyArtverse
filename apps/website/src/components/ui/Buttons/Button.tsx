"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { forwardRef } from "react"
import cn from "@/utils/cn"
import { cva } from "class-variance-authority"
import type { UrlObject } from "url"
import type { ReactMapElement, Variants } from "@/types/utils"

type Positions = "left" | "center" | "right"
type Sizes = "small" | "big"
type ButtonVariants = Exclude<Variants, "success" | "info"> | "error-secondary"

const Button = forwardRef(
  (
    {
      children,
      icon,
      disabled,
      type,
      variant,
      size,
      position,
      prefixIcon,
      suffixIcon,
      href,
      count,
      className,
      ...attributes
    }: Readonly<
      Partial<{
        children: React.ReactNode
        icon: NonNullable<React.ReactElement>
        disabled: boolean
        type: ReactMapElement<"button">["type"]
        variant: ButtonVariants
        position: Positions
        size: Sizes
        prefixIcon: React.ReactElement
        suffixIcon: React.ReactElement
        href: string | UrlObject
        count: number
      }> &
        (ReactMapElement<"button"> | ReactMapElement<"a">)
    >,
    ref
  ) => {
    const buttonVars = cva(
      ["flex items-center gap-x-1.5 rounded-md transition-[border,background-color]"],
      {
        variants: {
          intent: {
            primary: "border-transparent bg-300 hover:bg-400",
            secondary: "!border-[2px] bg-100 border-300 hover:bg-400 hover:border-400",
            tritery: "border-transparent bg-transparent hover:bg-400",
            warning: "bg-transparent",
            error: "bg-error text-active hover:bg-opacity-70 border-transparent",
            "error-secondary": "border-error hover:border-opacity-50"
          },
          size: {
            small: !icon ? "px-2.5 py-1.5" : "p-2",
            medium: !icon ? "px-3.5 py-2" : "p-2",
            big: !icon ? "px-5 py-2.5" : "p-3"
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

    const DynamicElement: any = !href ? "button" : Link

    return (
      <DynamicElement
        ref={ref as any}
        href={href ?? undefined}
        type={!href ? type ?? "button" : undefined}
        aria-disabled={disabled ?? undefined}
        className={cn(
          buttonVars({
            positions: position,
            intent: variant,
            size
          }),
          className
        )}
        {...attributes}
      >
        {prefixIcon}
        {icon}
        {children ? (
          <span className="select-none overflow-hidden whitespace-nowrap">
            {children}
            {count && (
              <span className="bg-100 text-700 ml-1.5 rounded-xl p-2 font-semibold">
                {count}
              </span>
            )}
          </span>
        ) : null}
        {suffixIcon}
      </DynamicElement>
    )
  }
)

Button.displayName = "Button"

export default Button
