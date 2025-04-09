import type React from "react"

export * from "./literals"

type IntrinsicElements = React.JSX.IntrinsicElements

export type ReactHTMLProp<T extends keyof IntrinsicElements> =
  IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, unknown>
    ? P
    : IntrinsicElements[T]

/**
 * An alias for `Pick<ReactHTMLProp<T>, ...>`
 * 
 * Reference: {@link ReactHTMLProp}
 * 
 * @template E An HTML element from `React.DetailedHTMLProps`
 * @template P Props to extract the specified element from
 */
export type ExtractReactHTMLProps<E extends keyof IntrinsicElements, P extends keyof ReactHTMLProp<E>> = Pick<ReactHTMLProp<E>, P>

/**
 * Since React 19, `forwardRef` has been deprecated and now natively passes `ref` from any element,
 * this type helps with this
 *
 * @template R The native element its being passed
 * @template P Component props
 */
export type ReactForwardRef<R extends HTMLElement, P> = {
  ref?: React.Ref<R>
} & P
