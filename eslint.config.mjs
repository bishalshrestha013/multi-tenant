import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import { rules } from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettier,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": ["warn", {
        "vars": "all",
        "args": "after-used",
      }]
    }
  },
];
