/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: [".eslintrc.js", "*.config.js"],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
