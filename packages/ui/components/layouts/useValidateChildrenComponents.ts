"use client"

import {
  Children,
  type Component,
  type ElementType,
  type FC,
  type ReactElement,
  type ReactNode,
  isValidElement
} from "react"

// A hacky-fix for the missing `name` property
type ExtendElementType = ElementType & { name: string }

/**
 * A hook to validate one or more specified React components passed
 * through `children`
 *
 * @param childrenProp The `children` prop
 * @param allowedComponents An array of allowed components to be passed
 */
export function useValidateChildrenComponents<
  ValidChildren extends ReactNode,
  AllowedComponents extends FC | Component
>(childrenProp: ValidChildren, allowedComponents: AllowedComponents[]) {
  return Children.map(childrenProp, (child) => {
    const isValidChildElement = isValidElement(child)

    if (
      isValidChildElement ||
     /* TODO: child leads to error Type error: Conversion of type 
      'string | number | bigint | boolean | Iterable<ReactNode> | Promise<AwaitedReactNode> | 
      null | undefined' to type 'ReactElement<unknown, string | JSXElementConstructor<any>>' 
      may be a mistake because neither type sufficiently overlaps with the other. If this was 
      intentional, convert the expression to 'unknown' first. 
      Type 'Promise<AwaitedReactNode>' is missing the following properties from type 
      'ReactElement<unknown, string | JSXElementConstructor<any>>': type, props, key **/
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      allowedComponents.some((allowedType) => (child as any).type === allowedType) 
    )
      return child

    const allowedNames = allowedComponents
      .map((type) => (type as ExtendElementType).name || type.toString())
      .join(", ")

    const invalidChildName = isValidChildElement && (child.type as ExtendElementType).name

    throw new Error(
      `Component '${invalidChildName}' is not allowed. The allowed components are: ${allowedNames}.`
    )
  })
}
