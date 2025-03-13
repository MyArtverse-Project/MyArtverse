import { kebabCase } from "lodash"

interface GroupProps {
  title: string
  description?: string | NonNullable<React.ReactElement>
  /**
   * Adds "Learn more" link at the end of the description
   */
  learnMoreLink?: string
  prefixIcon?: unknown
  potentialActions?: string | NonNullable<React.ReactElement>
  containerStyle?: "none" | "border" | "border-padding"
}

const rndTitle = crypto.randomUUID()
const rndDesc = crypto.randomUUID()

export function Group(props: React.PropsWithChildren<GroupProps>) {
  const kebabTitle = kebabCase(props.title)

  const ariaLabelledBy = `gt-${kebabTitle}-${rndTitle}`
  const ariaDescribedBy = `gd-${kebabTitle}-${rndDesc}`

  const containerStyleClass: Record<
    NonNullable<GroupProps["containerStyle"]>,
    string | undefined
  > = {
    none: undefined,
    border: "border border-400 mt-1 rounded-md",
    "border-padding": "border border-400 mt-1 rounded-md px-3 py-2",
  }

  return (
    <section
      data-mav-group=""
      id={kebabTitle}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={props.description ? ariaDescribedBy : undefined}
      className="flex flex-col gap-y-1.5"
    >
      <div
        className={!props.description ? "contents" : "flex flex-col gap-y-0.5"}
      >
        <div className="flex items-center justify-between">
          <h2 id={ariaLabelledBy} className="text-2xl">
            {props.title}
          </h2>
          <div
            className="empty:hidden"
            data-mav-group-potential-actions-slot=""
          >
            {props.potentialActions}
          </div>
        </div>
        <span
          id={ariaDescribedBy}
          data-mav-group-description=""
          className="my-1 opacity-75 empty:hidden"
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
