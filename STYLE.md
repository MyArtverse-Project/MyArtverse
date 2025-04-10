# MyArtverse Style Guide

The MyArtverse app is written in React and TypeScript; and have it's own convention it adheres too - but this style guide only focuses on the MyArtverse client code in particular.

## Defining React component

### Grouping components

Only group components when they belong in a certain sector; for reuseable components such as input fields, checkboxes, password fields, etc. they belong in the `Forms` directory.

The `Layouts` directory contain a set of reusable components and belong are considered to be used on page routes; and, in this context, aren't considered as standalone, reusable components. Navbars, sidebars, and footers fit in this category.

### Dealing with related components

This is for when one or more components that depend each other.

For example, a `<Notification>` component has two files: [`<NotificationItem>`](/apps/web/src/components/Notifications/NotificationItem.tsx) and [`<NotificationWindow>`](/apps/web/src/components/Notifications/NotificationWindow.tsx)

If a component is only being used by a parent component, which is used *only* by the parent component and nothing else, the child component should be marked as `/** @internal */` and shouldn't be imported anywhere else asides from what's defined in `index.tsx`.

Using from the example above, the parent component is `<NotificationWindow>` and the child component is `<NotificationItem>`, which is marked with the `@internal` hint since it's used by `<NotificationWindow>` only and nothing else.

## Imports

When using imports, especially for components, it needs to be tree-shakable—meaning it should use the `export function` keyword. The only exception where `export default function` is warranted is from page and API routes.

Imports are automatically sorted by Biome when running `biome check . --fix`.

Bottomline:

- Only use `export function` ***if*** you're writing a React component/layout or code that's reusable, such as hooks, Jotai atom store, etc.

- Only use `export default function` ***if*** you're writing for a page route

## Others

For other rules not covered in this style guide, there are also rules to adhere too:

- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
