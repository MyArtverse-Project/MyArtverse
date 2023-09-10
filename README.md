<div align="center">
  <img alt="MyFursona cards" src="https://github.com/MyFursona-Project/MyFursona/assets/94678583/0cc5e73f-3197-4170-906b-30a64063569a">
</div>

<h1 align="center">MyFursona</h1>

<p align="center">
  The <strong>MyFursona</strong> web and desktop platform written in Next.js, Tailwind, and
  Tauri.
</p>

## Contributing

This repo uses Husky hooks that format your code automatically when you push
a commit.

### Installation

> **Note**
> We recommend that you use the Yarn package manager to install dependencies.

Clone the repository and install dependencies and run the local dev server
on the root directory:

```console
git clone https://github.com/MyFursona-Project/MyFursona.git
yarn install
yarn dev
```

You can access it on http://localhost:3000.

## Commands

- `yarn dev` - Serves a running web app on your local machine
- `yarn dev:client` - Opens a desktop client, will require Rust
- `yarn build` - Builds the web app with Turborepo and caches it
- `yarn build:client` - Builds and bundles the desktop app for production
- `yarn build:all` - Builds both the web and desktop app

## License

Apache-2.0
