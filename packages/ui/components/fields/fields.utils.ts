import { kebabCase } from "lodash"
import { useId } from "react"

/**
 * Used for targetting accessibility tools
 */
export const useMemoizeA11yLabel = (propName?: string) => {
  const _id = useId()
  const kebabedPropName = kebabCase(propName)

  return `${kebabedPropName || "field"}-${_id}`
}
