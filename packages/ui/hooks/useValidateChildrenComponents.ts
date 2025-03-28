"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Children, isValidElement } from "react"

// A hacky-fix for the missing `name` property
type ExtendElementType = React.ElementType & { name: string }

/**
 * A hook to validate one or more specified React components passed
 * through the `children` prop
 *
 * @param childrenProp The `children` prop
 * @param allowedComponents An array of allowed components to be passed
 */
export function useValidateChildrenComponents<
  AllowedComponents extends
    | NonNullable<React.ReactNode>
    | React.ForwardRefExoticComponent<any>
>(childrenProp: React.ReactNode, allowedComponents: AllowedComponents[]) {
  return Children.map(childrenProp, (child) => {
    const isValidChildElement = isValidElement(child)

    if (
      isValidChildElement ||
      allowedComponents.some(
        (allowedType) =>
          (child as unknown as React.ReactElement).type === allowedType
      )
    )
      return child

    const allowedNames = allowedComponents
      .map((type) => (type as ExtendElementType).name || type.toString())
      .join(", ")

    const invalidChildName =
      isValidChildElement && (child.type as ExtendElementType).name

    throw new Error(
      `Component '${invalidChildName}' is not allowed. The allowed components are: ${allowedNames}.`
    )
  })
}
