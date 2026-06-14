<div align="center">
  <img alt="MyFursona cards" src="https://github.com/MyFursona-Project/MyFursona/assets/94678583/0cc5e73f-3197-4170-906b-30a64063569a">
</div>

<h1 align="center">MyArtverse</h1>

<div align="center">
  <a href="https://www.codefactor.io/repository/github/MyArtverse-Project/MyArtverse">
    <img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/MyArtverse-Project/MyArtverse">
  </a>
</div>

<p align="center">
  The <strong>MyArtverse</strong> web and desktop client
  written in Next.js, Tailwind CSS, and Headless UI!
</p>

## Overview

This repository is a monorepo containing frontend code written in TypeScript. The backend
code is written separately, which is located in [here](https://github.com/MyArtverse-Project/API).

### Project structure

- `apps`
  - [`desktop`](/apps/desktop/): desktop client written in Tauri
  - [`web`](/apps/web/): the Next.js frontend
- `packages`
  - [`config`](/packages/config): Mostly for TSConfig and Tailwind CSS
  - [`shared`](/packages/shared): Shared helper functions
  - [`ui`](/packages/ui/): Shared React components

## Contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md) for more

## License

[Apache 2.0](/LICENSE)
