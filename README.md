<h1 align="center">MyFursona</h1>

> **Note**
> The project is still work-in-progress and not ready for production yet, so a lot of breaking changes are bound to happen!

_MyFursona_ is an open-source platform where users can keep track of their characters/fursonas, commissions, and adoptables. 

![MyFursona design prototype](https://github.com/MyFursona-Project/MyFursona/assets/94678583/86098e7a-3d4b-414c-8953-931c95e34034)

## Tech stack

- **Nuxt.js** for the user interface
- **Fastify** powering its REST and GraphQL API
- **Python** for advanced image and data processing (e.g. profile views, favorites, etc.)

## Contributing

### Requirements

- Node.js 18 or higher (LTS recommended)
- Postgres
- Redis
- Yarn package manager
- (Optional) WSL/Git Bash

### Installation

Clone the repository and install dependencies

```console
yarn install
```

Start a local dev server
```console
yarn dev:web
```

## License

MIT
