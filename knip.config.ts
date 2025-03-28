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
    devDependencies: "warn",
    binaries: "off",
    duplicates: "error"
  }
} satisfies KnipConfig
