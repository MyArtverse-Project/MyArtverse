/**
 * Theme type literal
 */
type Theme = "system" | "light" | "dark"

/**
 * A generic that merges custom interface with ReactNode
 */
export type ChildrenNode<T extends object = {}> = {
  children?: React.ReactNode
} & T

/**
 * Removes undefined when defining keys from an interface
 */
export type NonNullKeyFromInterface<I, K extends keyof I> = NonNullable<I[K]>

/**
 * A custom Record generic for components
 */
export type ComponentRecord<
  Interface,
  Key extends keyof Interface,
  RecordPropertyType extends PropertyKey = string,
  RecordType = string
> = {
  [P in NonNullKeyFromInterface<Interface, Key> as Extract<
    P,
    keyof Interface
  >]: RecordType
} & Record<RecordPropertyType, RecordType>
