import { cn } from "@/lib/utils"
import { kebabCase } from "lodash"

interface GroupProps {
  title: string
  description?: string | NonNullable<React.ReactElement>
  prefixIcon?: unknown
  potentialActions?: string | NonNullable<React.ReactElement>
  containerStyle?: "none" | "border" | "border-padding"
}

const containerStyleClass: Record<
  NonNullable<GroupProps["containerStyle"]>,
  string | undefined
> = {
  none: undefined,
  border: "border border-border mt-1 rounded-md",
  "border-padding": "border border-border mt-1 rounded-md px-3 py-2"
}

export function Group(props: React.PropsWithChildren<GroupProps>) {
  const kebabTitle = kebabCase(props.title)
  const ariaLabelledBy = `gt-${kebabTitle}`
  const ariaDescribedBy = `gd-${kebabTitle}`

  return (
    <section
      id={kebabTitle}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={props.description ? ariaDescribedBy : undefined}
      className="flex flex-col gap-y-1.5"
    >
      <div
        className={!props.description ? "contents" : "flex flex-col gap-y-0.5"}
      >
        <div className="flex items-center justify-between">
          <h2 id={ariaLabelledBy} className="text-2xl font-semibold">
            {props.title}
          </h2>
          <div className="empty:hidden">{props.potentialActions}</div>
        </div>
        <span
          id={ariaDescribedBy}
          className="text-muted-foreground my-1 empty:hidden"
        >
          {props.description}
        </span>
      </div>
      <div className={containerStyleClass[props.containerStyle || "none"]}>
        {props.children}
      </div>
    </section>
  )
}

export function GroupContainer(props: React.PropsWithChildren) {
  return <div className="flex flex-col gap-y-6">{props.children}</div>
}

interface MarginGutterProps {
  screenSize: "lg" | "xl"
  className?: string
}

export function MarginGutter(
  props: React.PropsWithChildren<MarginGutterProps>
) {
  const screenSizes: Record<MarginGutterProps["screenSize"], string> = {
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl"
  }

  return (
    <div className={cn("mx-auto", screenSizes[props.screenSize], props.className)}>
      {props.children}
    </div>
  )
}
