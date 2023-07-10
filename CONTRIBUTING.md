> **Note**
> Contributing guidelines still under construction

# Contributing to the MyFursona Website

## Basic coding conventions

- Space out variables and conditions; function returns are spaced out above everything else

### Organized Imports

Imports are organized by the following:

- **Primary level**

  - Bulit-in React hooks and Next.js components
  - Global CSS stylesheets

- **Secondary level**
  - Third party libaries
  - Types, utils, components, and custom hooks

Example:

```ts
import { useState, useEffect } from "react"
import Link from "next/link"

import { LucideIcon } from "lucide-react"
import type { ChildrenNode } from "@/types"
```

Both levels can have imports be in any order as long as they honor it's corresponding level. So this example also checks out:

```ts
import { useState, useEffect } from "react"
import Link from "next/link"

import type { ChildrenNode } from "@/types"
import { LucideIcon } from "lucide-react"
```

### Components

Creating a component needs to have a following structure:

- Imports
- Custom type (if any; optional)
- Interface
- Export default function

If a component is from a sub-folder (i.e. `ui`, `Base` directories), always export components from the index file for a cleaner import.

### Creating a page in the `app/` directory

Create a folder of a page name you pick

```
my-awesome-page/
├─ page.tsx
```

Export its page metadata:

```tsx
import setPageMeta from "@/utils/setPageMeta"

export const metadata = setPageMeta({
  title: "My awesome page",
  description: ""
})

export default function MyAwesomePage() {
  return <div>My Awesome Page</div>
}
```
