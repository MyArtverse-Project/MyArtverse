<div align="center">
  <img alt="MyFursona cards" src="https://github.com/MyFursona-Project/MyFursona/assets/94678583/0cc5e73f-3197-4170-906b-30a64063569a">
</div>

<h1 align="center">MyFursona</h1>

<div align="center">
  <a href="https://www.codefactor.io/repository/github/myfursona-project/myfursona">
    <img alt="CodeFactor Grade" src="https://img.shields.io/codefactor/grade/github/MyFursona-Project/MyFursona">
  </a>
  <a href="https://stats.uptimerobot.com/rlVXRfwrKz">
    <img alt="UptimeRobot status" src="https://img.shields.io/uptimerobot/status/m794028551-c8c7591f5785702785b52996">
  </a>
</div>

<p align="center">
  The <strong>MyFursona</strong> web and desktop client written in Next.js.
</p>

## Contributing

### Prerequisites

- Node.js (versions 18 or higher)
- Yarn
- [Optional] Rust, for building the standalone desktop client (versions 1.72
  or higher)

### Setup and Installation

Fork/clone the repository, install its dependencies and run the local dev server
on the root directory:

```console
git clone https://github.com/MyFursona-Project/MyFursona.git
cd MyFursona
yarn
yarn dev
```

You can now access http://localhost:3000 on your browser.

It's also recommended to copy the `.env` file on the root (i.e. For making changes
to Stripe and/or PayPal payments), copy the `.env.local.example` file from the
root directory:

```console
# For Unix systems or using Git Bash/WSL
cp .env.local.example .env.local

# For Windows systems
copy .env.local.example .\.env.local /a
```

From there, you can provide your own client and secret keys already set
to test your own environment.

## Commands

- `yarn dev` - Serves a local web app on
- `yarn dev:client` - Opens a desktop client, will require Rust
- `yarn build` - Builds the web app with Turborepo and caches it on Vercel
- `yarn build:client` - Builds and bundles the desktop app for production
- `yarn build:all` - Builds both the web and desktop clients

## License

[Apache 2.0](/LICENSE) © Fusky Labs Software
