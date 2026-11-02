import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import tseslint from "typescript-eslint"

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // Type-aware rules (floating promises, unsafe any, misused promises, …),
  // which need the TypeScript program and so only apply to TS files
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx,mts,cts}"],
  })),
  {
    // Admin scripts talk to Directus through an SDK client without a schema
    // type, so every response is `any`. Typing it properly cascades through
    // the whole script for no runtime gain; the promise rules stay on.
    files: ["scripts/**"],
    rules: {
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Workaround for eslint-plugin-react incompatibility with ESLint v10.
    // eslint-plugin-react calls the removed context.getFilename() API for React
    // version auto-detection. Explicitly setting the version bypasses that.
    // Track: https://github.com/jsx-eslint/eslint-plugin-react/issues/3977
    settings: {
      react: { version: "19" },
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
    ],
  },
]

export default eslintConfig
