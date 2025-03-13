import { cn } from "@mav/shared/utils"

interface MarginGutterProps {
  screenSize: "lg" | "xl"
  className?: string
}

export function MarginGutter(
  props: React.PropsWithChildren<MarginGutterProps>,
) {
  const screenSizes: Record<MarginGutterProps["screenSize"], string> = {
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
  }

  return (
    <div
      data-mav-margin-gutter=""
      className={cn("mx-auto", screenSizes[props.screenSize], props.className)}
    >
      {props.children}
    </div>
  )
}
