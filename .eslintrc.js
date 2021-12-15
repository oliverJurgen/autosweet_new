module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-duplicates": "off",
    "no-use-before-define": "off",
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    "no-unused-vars": "warn",

    // "@typescript-eslint/quotes": [
    //   "error",
    //   "single",
    //   {
    //     allowTemplateLiterals: true,
    //   },
    // ],
    // "prettier/prettier": [
    //   "warn",
    //   {
    //     singleQuote: true,
    //     semi: true,
    //   },
    // ],
    // quotes: "off",
  },
};
