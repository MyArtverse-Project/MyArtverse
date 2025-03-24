import type { FC } from "react"

/**
 * A wrapper for `Object.assign` for defining namespaced React components
 *
 * @param rootComponent A root React component
 * @param childComponents Any components related to the root component
 */
export const mergeNamespaceComponents = <NC extends object>(
  rootComponent: FC,
  childComponents: NC
) => {
  return Object.assign(rootComponent, childComponents) as typeof rootComponent &
    NC
}
