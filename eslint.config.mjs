import next from "./node_modules/eslint-config-next/dist/core-web-vitals.js";
import nextTS from "./node_modules/eslint-config-next/dist/typescript.js";

const eslintConfig = [
  ...next,
  ...nextTS,
  {
    ignores: ["out/**", ".next/**"],
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
