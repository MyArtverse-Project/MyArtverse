<h1 align="center">MyFursona</h1>

> **Note**
> The project is still work-in-progress and not ready for production, so many breaking changes are bound to happen!

**MyFursona** is an open-source platform where users can keep track of their characters/fursonas, commissions, and adoptables.

![MyFursona design prototype](https://github.com/MyFursona-Project/MyFursona/assets/94678583/86098e7a-3d4b-414c-8953-931c95e34034)

## Project structure

- [`@myfursona/api`][api] - A botched Express REST & GraphQL API
- [`@myfursona/web`][web] - The main website written in Next.js
- [`@myfursona/client`][cli] - Deskop client written in Tauri and Next.js

## Prerequisites

- Node.js 18 or higher (LTS recommended)
- Yarn package manager
- [Optional] WSL/Git Bash
- [Optional] Rust (for Tauri development)

## Installation

Clone the repository and install dependencies

```console
yarn install
```

Start a local dev server

```console
yarn dev:web
```

[api]: https://github.com/MyFursona-Project/MyFursona/tree/next13-rewrite/apps/api
[cli]: https://github.com/MyFursona-Project/MyFursona/tree/next13-rewrite/apps/client
[web]: https://github.com/MyFursona-Project/MyFursona/tree/next13-rewrite/apps/website
