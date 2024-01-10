<div align="center">
  <img alt="MyFursona cards" src="https://github.com/MyFursona-Project/MyFursona/assets/94678583/0cc5e73f-3197-4170-906b-30a64063569a">
</div>

<h1 align="center">MyFursona</h1>

<div align="center">
  <a href="https://www.codefactor.io/repository/github/MyFursona-Project/MyArtverse">
    <img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/MyFursona-Project/MyArtverse">
  </a>
  <a href="https://stats.uptimerobot.com/rlVXRfwrKz">
    <img alt="UptimeRobot status" src="https://img.shields.io/uptimerobot/status/m794028551-c8c7591f5785702785b52996">
  </a>
</div>

<p align="center">
  The <strong>MyFursona</strong> web and desktop client
  written in Next.js, Tailwind CSS, and Headless UI!
</p>

## Overview

This repository is a monorepo, containing frontend code written in TypeScript.

There are also `codemods` that are small and custom Node scripts to keep
the codebase clean and maintainable.

### Project structure

- `apps`
  - `website`: the Next.js frontend
  - `desktop`: desktop client written in Tauri
  - `widget`: used for embeds from other websites
- `codemod`: scripts to keep the codebase clean
- `packages`: shared configs and components

## Contributing

### Prerequisites

- Node.js (version 20 or higher)
- Yarn

### Setup and Installation

Fork/clone the repository, install its dependencies and run the local dev server
on the root directory:

```console
git clone https://github.com/MyFursona-Project/MyFursona.git
cd MyFursona
yarn
yarn dev
```

You can now access http://localhost:3000 on your browser!

## Commands

- `yarn dev` - Serves a local web app
- `yarn dev:w` - Serves a widget app
- `yarn build` - Builds the web app
- `yarn build:w` - Builds the widget app

## License

[Apache 2.0](/LICENSE)
