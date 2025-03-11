import type React from "react"

export type Variants = "primary" | "secondary" | "tritery" | "success" | "warning" | "alert" | "info"

type IntrinsicElements = React.JSX.IntrinsicElements

export type ReactHTMLElement<T extends keyof IntrinsicElements> = IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, unknown> ? P : IntrinsicElements[T]

/**
 * Since React 19, `forwardRef` has been deprecated and now natively passes `ref` from any element,
 * this type helps with this
 * 
 * @template R The native element its being passed
 * @template P Component props
 */
export type ReactForwardRef<R extends HTMLElement, P> = { ref?: React.Ref<R> } & P
