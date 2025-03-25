import type { KnipConfig } from "knip"

export default {
  eslint: {
    config: ["biome.json"]
  },
  entry: ["apps/**/src/**/*.{ts,tsx}!", "packages/**/*.{js,ts,tsx}!"],
  project: ["**/*.{ts,tsx}!"],
  rules: {
    files: "warn",
    exports: "error",
    types: "warn",
    dependencies: "warn",
    unlisted: "off",
    devDependencies: "off",
    binaries: "off",
    duplicates: "error"
  },
  ignore: [
    // Symlink file to SidebarGlobal.constants.ts
    "apps/web/src/app/(main)/(settings)/settings/setting-routes.ts",

    "packages/ui/tailwind.config.ts"
  ]
} satisfies KnipConfig
