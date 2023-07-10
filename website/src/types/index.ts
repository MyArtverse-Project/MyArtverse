/**
 * Theme type literal
 */
export type Theme = "system" | "light" | "dark"

/**
 * A generic that merges custom interface with ReactNode
 */
export type ChildrenNode<T extends object = {}> = {
  children?: React.ReactNode
} & T

/**
 * Removes undefined when defining keys from an interface
 */
export type NonNullKeyFromInterface<Type, Key extends keyof Type> = NonNullable<
  Type[Key]
>

/**
 * A custom Record generic for components
 */
export type ComponentRecord<
  Type,
  Key extends keyof Type,
  RecordType = string
> = {
  [P in NonNullKeyFromInterface<Type, Key> as Extract<
    P,
    keyof Type
  >]: RecordType
} & Record<PropertyKey, RecordType>
