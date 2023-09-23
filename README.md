<div align="center">
  <img alt="MyFursona cards" src="https://github.com/MyFursona-Project/MyFursona/assets/94678583/0cc5e73f-3197-4170-906b-30a64063569a">
</div>

<h1 align="center">MyFursona</h1>
<p align="center">
  The <strong>MyFursona</strong> web and desktop client written in Next.js,
  Tailwind CSS, and Tauri.
</p>

## Contributing

This repo uses `lint-staged` that format your code automatically with Prettier
when you push a commit.

If you're having issues when commiting, you can bypass the Husky hooks entirely:

```console
git commit -m "<COMMIT-MSG>" -n
```

### Prerequisites

- Node.js (versions 18 or higher)
- Yarn
- _[Optional]_ Rust, for building the standalone desktop client (versions 1.72
  or higher)

### Setup and Installation

Fork/clone the repository and install dependencies and run the local dev server
on the root directory:

```console
git clone https://github.com/MyFursona-Project/MyFursona.git
yarn
yarn dev
```

You can now access http://localhost:3000 on your browser.

For making changes to Stripe and/or PayPal payments, copy the
`.env.local.example` file from the root directory:

```console
# For Unix systems or using Git Bash/WSL
cp .env.local.example ./apps/website/.env.local

# For Windows systems
copy .env.local.example .\apps\website\.env.local /a
```

From there, you can provide your own client and secret keys setup to test
your own environment.

## Commands

- `yarn dev` - Serves a running web app on your local machine
- `yarn dev:client` - Opens a desktop client, will require Rust
- `yarn build` - Builds the web app with Turborepo and caches it on Vercel
- `yarn build:client` - Builds and bundles the desktop app for production
- `yarn build:all` - Builds both the web and desktop clients

## License

Apache-2.0 © Fusky Labs Software
